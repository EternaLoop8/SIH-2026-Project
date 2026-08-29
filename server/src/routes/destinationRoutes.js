import express from "express";

import {
  getDestinations,
  getDestinationById,
  createDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

router.get("/", getDestinations);

router.get("/:id", getDestinationById);

router.post("/", createDestination);

export default router;
