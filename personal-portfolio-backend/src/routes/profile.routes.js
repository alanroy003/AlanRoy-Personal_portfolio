import express from "express";
import * as controller from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/resume", controller.getResume);
router.post("/resume", controller.updateResume);
router.put("/resume", controller.updateResume);
router.delete("/resume", controller.deleteResume);

router.get("/social/:platform", controller.getSocial);
router.post("/social/:platform", controller.updateSocial);
router.put("/social/:platform", controller.updateSocial);
router.delete("/social/:platform", controller.deleteSocial);

export default router;
