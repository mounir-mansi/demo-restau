import { jest, describe, beforeAll, beforeEach, test, expect } from "@jest/globals";
import argon2 from "argon2";

// --- Mocks Prisma ---
const mockAdmin = { findUnique: jest.fn() };
const mockBlacklisted = { findUnique: jest.fn(), create: jest.fn() };

jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  default: { admin: mockAdmin, blacklistedToken: mockBlacklisted },
}));

// --- Mock emailSender (Resend lève une erreur sans API key) ---
jest.unstable_mockModule("../src/lib/emailSender.js", () => ({
  sendContactEmail: jest.fn().mockResolvedValue(undefined),
  sendReplyEmail: jest.fn().mockResolvedValue(undefined),
}));

// --- Mocks handleUpload (évite l'initialisation S3/multer-s3) ---
jest.unstable_mockModule("../src/middleware/handleUpload.js", () => ({
  upload: jest.fn(() => (req, res, next) => next()),
  uploadFixed: jest.fn(() => (req, res, next) => next()),
}));

// Imports dynamiques APRÈS les mocks
const { default: app } = await import("../src/app.js");
const { default: supertest } = await import("supertest");
const request = supertest;

// ─────────────────────────────────────────────
describe("POST /login", () => {
  let hash;

  beforeAll(async () => {
    hash = await argon2.hash("admin123", { type: argon2.argon2id });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockBlacklisted.findUnique.mockResolvedValue(null);
  });

  test("valide → 200 + cookie", async () => {
    mockAdmin.findUnique.mockResolvedValue({ id: 1, login: "admin", password: hash });

    const res = await request(app)
      .post("/login")
      .send({ login: "admin", password: "admin123" });

    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  test("mot de passe incorrect → 401", async () => {
    mockAdmin.findUnique.mockResolvedValue({ id: 1, login: "admin", password: hash });

    const res = await request(app)
      .post("/login")
      .send({ login: "admin", password: "mauvais_mdp" });

    expect(res.status).toBe(401);
  });

  test("login inexistant → 401", async () => {
    mockAdmin.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post("/login")
      .send({ login: "personne", password: "admin123" });

    expect(res.status).toBe(401);
  });

  test("champs manquants → 400", async () => {
    const res = await request(app)
      .post("/login")
      .send({ login: "admin" }); // sans password

    expect(res.status).toBe(400);
  });
});

// ─────────────────────────────────────────────
describe("GET /admin/me", () => {
  beforeEach(() => jest.clearAllMocks());

  test("sans token → 401", async () => {
    mockBlacklisted.findUnique.mockResolvedValue(null);
    const res = await request(app).get("/admin/me");
    expect(res.status).toBe(401);
  });
});

// ─────────────────────────────────────────────
describe("GET /logout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBlacklisted.create.mockResolvedValue({});
  });

  test("sans token → 200 (logout toujours réussi)", async () => {
    const res = await request(app).get("/logout");
    expect(res.status).toBe(200);
  });
});
