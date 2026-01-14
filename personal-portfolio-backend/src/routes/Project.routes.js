import express from "express";
import multer from "multer";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getHighlightedProjects,
  getNonHighlightedProjects,
} from "../controllers/Project.controller.js";

const router = express.Router();

// Multer: store files in memory first
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = file.originalname.toLowerCase().match(allowed);
    if (ext) cb(null, true);
    else cb(new Error("Only .jpg, .jpeg, .png allowed"));
  },
});

// Routes
router.get("/filter/highlighted", getHighlightedProjects);
router.get("/filter/non-highlighted", getNonHighlightedProjects);

router.post("/", upload.single("image"), createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;
