import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const VALID_SLOTS = ["hero", "chi-siamo", "concert"];
let cache = { data: null, at: 0 };
const TTL = 5 * 60 * 1000;

function r2url(key) {
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function getSections(req, res) {
  if (cache.data && Date.now() - cache.at < TTL) return res.json(cache.data);

  const results = {};
  await Promise.all(
    VALID_SLOTS.map(async (slot) => {
      const key = `sections/${slot}`;
      try {
        await s3.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
        results[slot] = r2url(key);
      } catch {
        results[slot] = null;
      }
    })
  );

  cache = { data: results, at: Date.now() };
  res.json(results);
}

export async function uploadSection(req, res) {
  const { slot } = req.params;
  if (!VALID_SLOTS.includes(slot))
    return res.status(400).json({ error: "Slot invalide." });
  if (!req.file) return res.status(400).json({ error: "Aucun fichier." });
  cache.data = null;
  res.json({ slot, src: r2url(`sections/${slot}`) });
}
