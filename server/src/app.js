import express from "express";
import cors from "cors";

import destinationRoutes from "./routes/destinationRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/experience", experienceRoutes);

export default app;