import express from "express";
import upload  from "../middlewares/multer.js";

import {
  getDestinations,
  getDestinationById,
  createDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

router.get("/", getDestinations);

router.get("/:id", getDestinationById);

router.post("/", upload.any(), createDestination);

export default router;
