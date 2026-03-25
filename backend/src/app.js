import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import router from "./routers/router.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet({ contentSecurityPolicy: false }));

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:5173"] : []),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS non autorisé"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(
    "/login",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: { error: "Trop de tentatives, réessayez dans 15 minutes." },
    })
  );
}

app.use("/", router);

export default app;
