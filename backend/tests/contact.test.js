import { jest, describe, beforeEach, test, expect } from "@jest/globals";

// --- Mocks Prisma ---
const mockMsg = {
  create: jest.fn(),
  findMany: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
const mockBlacklisted = { findUnique: jest.fn(), create: jest.fn() };

jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  default: { contactMessage: mockMsg, blacklistedToken: mockBlacklisted },
}));

// --- Mock emailSender (pas d'envoi réel) ---
jest.unstable_mockModule("../src/lib/emailSender.js", () => ({
  sendContactEmail: jest.fn().mockResolvedValue(undefined),
  sendReplyEmail: jest.fn().mockResolvedValue(undefined),
}));

// --- Mock handleUpload ---
jest.unstable_mockModule("../src/middleware/handleUpload.js", () => ({
  upload: jest.fn(() => (req, res, next) => next()),
  uploadFixed: jest.fn(() => (req, res, next) => next()),
}));

const { default: app } = await import("../src/app.js");
const { default: supertest } = await import("supertest");
const request = supertest;

// ─────────────────────────────────────────────
describe("POST /contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBlacklisted.findUnique.mockResolvedValue(null);
    mockMsg.create.mockResolvedValue({ id: 1 });
  });

  test("champs valides → 201", async () => {
    const res = await request(app).post("/contact").send({
      name: "Jean Dupont",
      email: "jean@example.com",
      message: "Bonjour, je voudrais réserver une table.",
    });

    expect(res.status).toBe(201);
    expect(mockMsg.create).toHaveBeenCalledTimes(1);
  });

  test("champs manquants → 400", async () => {
    const res = await request(app).post("/contact").send({
      name: "Jean",
      email: "jean@example.com",
      // message absent
    });

    expect(res.status).toBe(400);
    expect(mockMsg.create).not.toHaveBeenCalled();
  });

  test("email invalide → 400", async () => {
    const res = await request(app).post("/contact").send({
      name: "Jean",
      email: "pas-un-email",
      message: "Test",
    });

    expect(res.status).toBe(400);
    expect(mockMsg.create).not.toHaveBeenCalled();
  });

  test("nom trop long → 400", async () => {
    const res = await request(app).post("/contact").send({
      name: "A".repeat(101),
      email: "jean@example.com",
      message: "Test",
    });

    expect(res.status).toBe(400);
  });

  test("message trop long → 400", async () => {
    const res = await request(app).post("/contact").send({
      name: "Jean",
      email: "jean@example.com",
      message: "A".repeat(2001),
    });

    expect(res.status).toBe(400);
  });
});

// ─────────────────────────────────────────────
describe("GET /admin/messages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBlacklisted.findUnique.mockResolvedValue(null);
  });

  test("sans token → 401", async () => {
    const res = await request(app).get("/admin/messages");
    expect(res.status).toBe(401);
    expect(mockMsg.findMany).not.toHaveBeenCalled();
  });
});
