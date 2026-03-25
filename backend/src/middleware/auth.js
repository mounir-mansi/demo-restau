import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export async function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Non authentifié." });

  try {
    const blacklisted = await prisma.blacklistedToken.findUnique({ where: { token } });
    if (blacklisted) return res.status(401).json({ error: "Session expirée." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide." });
  }
}
