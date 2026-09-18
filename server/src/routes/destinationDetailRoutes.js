import express from "express";

import {
  getDestinationDetailById,
  createDestinationDetailById,
  updateDestinationDetailById,
} from "../controllers/destinationDetailController.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

// ==========================================
// GET detailed information
// GET /api/destinations/:id/details
// ==========================================

router.get(
  "/:id/details",
  getDestinationDetailById
);

// ==========================================
// POST detailed information
// POST /api/destinations/:id/details
// ==========================================

router.post(
  "/:id/details",
  upload.array("images", 5),
  createDestinationDetailById
);

// ==========================================
// PUT / UPDATE detailed information
// PUT /api/destinations/:id/details
// ==========================================

router.put(
  "/:id/details",
  upload.array("images", 5),
  updateDestinationDetailById
);

export default router;