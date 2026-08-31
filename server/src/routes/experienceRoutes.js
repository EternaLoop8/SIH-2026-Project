import express from "express";
import upload from "../middlewares/multer.js";

import {
    getExperience, getExperienceById, createExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperience);

router.get("/:id", getExperienceById);

router.post("/", upload.any(), createExperience);

export default router;