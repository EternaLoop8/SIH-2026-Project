import express from "express";

import {
  getEvents,
  getEventById,
  createEvent,
} from "../controllers/eventController.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post(
  "/",
  upload.single("image"),
  createEvent,
);

export default router;