import express from "express";
import session from "express-session";
import compression from "compression";
import helmet from "helmet";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import path from "path";
import { fileURLToPath } from "url";
import pgSession from "connect-pg-simple";
import { migrate } from "drizzle-orm/neon-http/migrator";

import { db } from "./db";
import routes from "./routes";

const app = express();

// Security
app.use(helmet());
app.use(compression());
app.use(express.json());

// Session store setup (if you're using sessions)
const pgSessionStore = pgSession(session);
app.use(
  session({
    store: new pgSessionStore({
      conString: process.env.DATABASE_URL,
    }),
    secret: process.env.SESSION_SECRET || "keyboard_cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Update if you enable HTTPS
  }),
);

// ✅ Health check route for Railway
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Your app routes
app.use("/api", routes);

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../dist/public")));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
