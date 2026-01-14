import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import projectRoutes from "./routes/Project.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Project API
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);

// Serve admin static if needed

app.use(express.static(path.join(__dirname, "../../public")));

app.use("/admin", express.static(path.join(__dirname, "public")));

// Global Error Handler
app.use(errorHandler);

export default app; // ✅ export default
