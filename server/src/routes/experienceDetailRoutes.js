import express from "express";

import { getExperienceDetailById, createExperienceDetailById } from "../controllers/experienceDetailController.js"

import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/:id/details", getExperienceDetailById);

router.post("/:id/details", upload.array("images", 5), createExperienceDetailById);

export default router;