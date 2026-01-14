import Project from "../models/Project.model.js";
import path from "path";
import fs from "fs";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// Helper: save image to frontend folder
const saveImage = (file, title) => {
  if (!file) return { img: false, img_url: "" };

  const ext = path.extname(file.originalname);
  const safeTitle = title.replace(/\s+/g, "-").toLowerCase();
  const fileName = `${safeTitle}-${Date.now()}${ext}`;

  // Folder path in frontend
  const destFolder = path.join("../public/projectImages", safeTitle);

  if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

  const filePath = path.join(destFolder, fileName);

  fs.writeFileSync(filePath, file.buffer);

  const relativePath = `/projectImages/${safeTitle}/${fileName}`;
  return { img: true, img_url: relativePath };
};

// Create Project
export const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    tech,
    github_link,
    Live,
    livedemo_link,
    highlighted,
  } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Title & description required" });
  }

  const { img, img_url } = saveImage(req.file, title);

  const project = await Project.create({
    title,
    description,
    tech: tech ? JSON.parse(tech) : [],
    github_link,
    Live,
    livedemo_link,
    highlighted,
    img,
    img_url,
  });

  res.status(201).json({ success: true, data: project });
});

// Get All Projects
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ success: true, data: projects });
});

// Get Single Project
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  res.json({ success: true, data: project });
});

// Update Project
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });

  const {
    title,
    description,
    tech,
    github_link,
    Live,
    livedemo_link,
    highlighted,
  } = req.body;

  // Update basic fields
  if (title) project.title = title;
  if (description) project.description = description;
  if (tech) project.tech = JSON.parse(tech);
  if (github_link !== undefined) project.github_link = github_link;
  if (Live !== undefined) project.Live = Live;
  if (livedemo_link !== undefined) project.livedemo_link = livedemo_link;
  if (highlighted !== undefined) project.highlighted = highlighted;

  // Update image if new uploaded
  if (req.file) {
    // Optional: remove old image from frontend
    if (project.img_url) {
      const oldPath = path.join("../personal-portfolio/src", project.img_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const { img, img_url } = saveImage(req.file, project.title);
    project.img = img;
    project.img_url = img_url;
  }

  await project.save();
  res.json({ success: true, data: project });
});

// Delete Project
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });

  // Optional: delete image file
  if (project.img_url) {
    const imgPath = path.join("../personal-portfolio/src", project.img_url);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await project.remove();
  res.json({ success: true, message: "Project deleted" });
});

// Highlighted Filter
export const getHighlightedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ highlighted: true });
  res.json({ success: true, data: projects });
});

// Non-highlighted Filter
export const getNonHighlightedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ highlighted: false });
  res.json({ success: true, data: projects });
});
