import express from "express";

import {
  getDestinationDetailById,
  createDestinationDetailById,
} from "../controllers/destinationDetailController.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

// GET detailed information
router.get("/:id/details", getDestinationDetailById);

// POST detailed information
router.post(
  "/:id/details",
  upload.array("images", 5),
  createDestinationDetailById
);

export default router;
