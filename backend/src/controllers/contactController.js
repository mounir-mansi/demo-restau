import prisma from "../lib/prisma.js";
import { sendContactEmail, sendReplyEmail } from "../lib/emailSender.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Cache messages admin
let messagesCache = { data: null, at: 0 };
const TTL = 5 * 60 * 1000;

export async function submitContact(req, res) {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim())
    return res.status(400).json({ error: "Tous les champs sont requis." });
  if (name.length > 100)
    return res.status(400).json({ error: "Nom trop long." });
  if (!EMAIL_REGEX.test(email))
    return res.status(400).json({ error: "Email invalide." });
  if (message.length > 2000)
    return res.status(400).json({ error: "Message trop long." });

  const msg = await prisma.contactMessage.create({
    data: { name: name.trim(), email: email.trim(), message: message.trim() },
  });

  messagesCache.data = null;

  // Best-effort
  sendContactEmail({ name, email, message }).catch(() => {});

  res.status(201).json({ message: "Message envoyé." });
}

export async function getMessages(req, res) {
  if (messagesCache.data && Date.now() - messagesCache.at < TTL)
    return res.json(messagesCache.data);

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  messagesCache = { data: messages, at: Date.now() };
  res.json(messages);
}

export async function markRead(req, res) {
  const id = parseInt(req.params.id);
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  messagesCache.data = null;
  res.json({ message: "Marqué comme lu." });
}

export async function deleteMessage(req, res) {
  const id = parseInt(req.params.id);
  await prisma.contactMessage.delete({ where: { id } });
  messagesCache.data = null;
  res.json({ message: "Supprimé." });
}

export async function replyMessage(req, res) {
  const id = parseInt(req.params.id);
  const { replyText } = req.body;
  if (!replyText?.trim())
    return res.status(400).json({ error: "Réponse vide." });

  const msg = await prisma.contactMessage.findUnique({ where: { id } });
  if (!msg) return res.status(404).json({ error: "Message introuvable." });

  await sendReplyEmail({ to: msg.email, name: msg.name, replyText });
  await prisma.contactMessage.update({ where: { id }, data: { replied: true, read: true } });
  messagesCache.data = null;
  res.json({ message: "Réponse envoyée." });
}
