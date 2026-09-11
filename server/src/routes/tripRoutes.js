import express from "express";

import {
  createTrip,
  getTripById,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/", createTrip);

router.get("/:id", getTripById);

export default router;