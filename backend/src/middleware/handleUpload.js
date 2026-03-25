import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Type de fichier non autorisé (JPEG, PNG, WebP uniquement)."));
};

// Upload avec clé aléatoire (galerie)
export const upload = (prefix) =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.R2_BUCKET,
      key: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1].replace("jpeg", "jpg");
        cb(null, `${prefix}/${randomBytes(8).toString("hex")}.${ext}`);
      },
    }),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single("image");

// Upload avec clé fixe (sections, photo principale)
export const uploadFixed = (key) =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.R2_BUCKET,
      key: (req, file, cb) => cb(null, key),
    }),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single("image");
