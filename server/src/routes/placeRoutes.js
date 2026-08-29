import express from "express";

import {
  getPlaces,
  getPlacesByDestination,
  getPlaceById,
  createPlace,
} from "../controllers/placeController.js";

const router = express.Router();

router.get("/", getPlaces);

router.get("/destination/:destinationId", getPlacesByDestination);

router.get("/:id", getPlaceById);

router.post("/", createPlace);

export default router;