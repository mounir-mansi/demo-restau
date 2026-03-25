import { jest, describe, beforeEach, test, expect } from "@jest/globals";

// --- Mock S3 (pour GET /api/gallery) ---
const mockS3Send = jest.fn();

jest.unstable_mockModule("@aws-sdk/client-s3", () => ({
  S3Client: jest.fn(() => ({ send: mockS3Send })),
  ListObjectsV2Command: jest.fn(),
  HeadObjectCommand: jest.fn(),
  DeleteObjectCommand: jest.fn(),
}));

// --- Mock Prisma (pour verifyToken) ---
const mockBlacklisted = { findUnique: jest.fn(), create: jest.fn() };

jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  default: { blacklistedToken: mockBlacklisted },
}));

// --- Mock emailSender (Resend lève une erreur sans API key) ---
jest.unstable_mockModule("../src/lib/emailSender.js", () => ({
  sendContactEmail: jest.fn().mockResolvedValue(undefined),
  sendReplyEmail: jest.fn().mockResolvedValue(undefined),
}));

// --- Mock handleUpload (évite l'init multer-s3) ---
jest.unstable_mockModule("../src/middleware/handleUpload.js", () => ({
  upload: jest.fn(() => (req, res, next) => next()),
  uploadFixed: jest.fn(() => (req, res, next) => next()),
}));

const { default: app } = await import("../src/app.js");
const { default: supertest } = await import("supertest");
const request = supertest;

// ─────────────────────────────────────────────
describe("GET /api/gallery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // S3 renvoie une liste vide
    mockS3Send.mockResolvedValue({ Contents: [] });
  });

  test("public → 200 avec structure main/photos", async () => {
    const res = await request(app).get("/api/gallery");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("main");
    expect(res.body).toHaveProperty("photos");
    expect(Array.isArray(res.body.photos)).toBe(true);
  });
});

// ─────────────────────────────────────────────
describe("POST /admin/gallery/upload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBlacklisted.findUnique.mockResolvedValue(null);
  });

  test("sans token → 401", async () => {
    const res = await request(app)
      .post("/admin/gallery/upload")
      .attach("image", Buffer.from("fake"), "photo.jpg");

    expect(res.status).toBe(401);
  });
});

// ─────────────────────────────────────────────
describe("DELETE /admin/gallery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBlacklisted.findUnique.mockResolvedValue(null);
  });

  test("sans token → 401", async () => {
    const res = await request(app)
      .delete("/admin/gallery")
      .send({ key: "gallery/test.jpg" });

    expect(res.status).toBe(401);
  });
});
