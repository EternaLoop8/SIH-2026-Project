import express from "express";
import upload from "../middlewares/multer.js";

import {
    getBusiness, getBusinessById, createBusiness,
} from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusiness);

router.get("/:id", getBusinessById);

router.post("/", upload.any(), createBusiness);

export default router;