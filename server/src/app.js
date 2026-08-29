import express from "express";
import cors from "cors";

import destinationRoutes from "./routes/destinationRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/places", placeRoutes);

export default app;