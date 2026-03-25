import { Router } from "express";
import { login, logout, me } from "../controllers/authController.js";
import {
  submitContact,
  getMessages,
  markRead,
  deleteMessage,
  replyMessage,
} from "../controllers/contactController.js";
import {
  getGallery,
  uploadMain,
  uploadPhoto,
  deletePhoto,
} from "../controllers/galleryController.js";
import { getSections, uploadSection } from "../controllers/sectionsController.js";
import { verifyToken } from "../middleware/auth.js";
import { upload, uploadFixed } from "../middleware/handleUpload.js";

const router = Router();

// Auth
router.post("/login", login);
router.get("/logout", logout);
router.get("/admin/me", verifyToken, me);

// Contact
router.post("/contact", submitContact);
router.get("/admin/messages", verifyToken, getMessages);
router.patch("/admin/messages/:id/read", verifyToken, markRead);
router.delete("/admin/messages/:id", verifyToken, deleteMessage);
router.post("/admin/messages/:id/reply", verifyToken, replyMessage);

// Galerie
router.get("/api/gallery", getGallery);
router.post("/admin/gallery/main", verifyToken, uploadFixed("gallery/main"), uploadMain);
router.post("/admin/gallery/upload", verifyToken, upload("gallery"), uploadPhoto);
router.delete("/admin/gallery", verifyToken, deletePhoto);

// Sections
router.get("/api/sections", getSections);
router.post("/admin/sections/:slot", verifyToken, (req, res, next) => {
  uploadFixed(`sections/${req.params.slot}`)(req, res, next);
}, uploadSection);

export default router;
