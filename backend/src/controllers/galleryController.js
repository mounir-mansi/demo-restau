import { S3Client, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";
import { deleteS3Object } from "../lib/deleteS3Object.js";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

let cache = { data: null, at: 0 };
const TTL = 5 * 60 * 1000;

function r2url(key) {
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function getGallery(req, res) {
  if (cache.data && Date.now() - cache.at < TTL) return res.json(cache.data);

  const result = await s3.send(
    new ListObjectsV2Command({ Bucket: process.env.R2_BUCKET, Prefix: "gallery/" })
  );
  const objects = result.Contents || [];

  let main = null;
  const photos = [];

  for (const obj of objects) {
    const key = obj.Key;
    if (key === "gallery/main") {
      main = { src: r2url(key), key };
    } else if (key !== "gallery/") {
      photos.push({ src: r2url(key), key });
    }
  }

  const data = { main, photos };
  cache = { data, at: Date.now() };
  res.json(data);
}

export async function uploadMain(req, res) {
  if (!req.file) return res.status(400).json({ error: "Aucun fichier." });
  cache.data = null;
  res.json({ src: r2url("gallery/main"), key: "gallery/main" });
}

export async function uploadPhoto(req, res) {
  if (!req.file) return res.status(400).json({ error: "Aucun fichier." });
  cache.data = null;
  res.json({ src: r2url(req.file.key), key: req.file.key });
}

export async function deletePhoto(req, res) {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: "Clé manquante." });
  await deleteS3Object(key);
  cache.data = null;
  res.json({ message: "Photo supprimée." });
}
