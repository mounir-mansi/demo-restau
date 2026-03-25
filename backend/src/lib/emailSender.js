import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendContactEmail({ name, email, message }) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_CONTACT,
    subject: `Nouveau message de ${name}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });
}

export async function sendReplyEmail({ to, name, replyText }) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Réponse à votre message`,
    html: `
      <p>Bonjour ${escapeHtml(name)},</p>
      <p>${escapeHtml(replyText).replace(/\n/g, "<br>")}</p>
    `,
  });
}
