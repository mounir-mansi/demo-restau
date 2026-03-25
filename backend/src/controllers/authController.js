import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 8 * 60 * 60 * 1000,
};

export async function login(req, res) {
  const { login, password } = req.body;
  if (!login || !password)
    return res.status(400).json({ error: "Login et mot de passe requis." });

  const admin = await prisma.admin.findUnique({ where: { login } });
  if (!admin) return res.status(401).json({ error: "Identifiants incorrects." });

  const valid = await argon2.verify(admin.password, password);
  if (!valid) return res.status(401).json({ error: "Identifiants incorrects." });

  const token = jwt.sign({ id: admin.id, login: admin.login }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  res.cookie("token", token, COOKIE_OPTS);
  res.json({ message: "Connecté." });
}

export async function logout(req, res) {
  const token = req.cookies?.token;
  if (token) {
    try {
      await prisma.blacklistedToken.create({ data: { token } });
    } catch {}
  }
  res.clearCookie("token");
  res.json({ message: "Déconnecté." });
}

export async function me(req, res) {
  res.json({ id: req.admin.id, login: req.admin.login });
}
