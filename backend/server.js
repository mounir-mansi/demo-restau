import "dotenv/config";
import http from "http";
import app from "./src/app.js";

const PORT = process.env.PORT || 3002;
const HOST = process.env.NODE_ENV === "production" ? "127.0.0.1" : "0.0.0.0";

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Serveur démarré sur http://${HOST}:${PORT} [${process.env.NODE_ENV}]`);
});
