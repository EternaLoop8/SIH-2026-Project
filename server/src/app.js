import "dotenv/config";
import express from "express";
import cors from "cors";

import destinationRoutes from "./routes/destinationRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";

import destinationDetailRoutes from "./routes/destinationDetailRoutes.js";
import experienceDetailRoutes from "./routes/experienceDetailRoutes.js"

import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Allowed origins (Local development + Your live production frontend)
const allowedOrigins = [
  "http://localhost:5173", 
  "https://sih-2026-project-eosin.vercel.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true // Optional: Add this if you intend to send cookies/sessions between front and back
  })
);

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/experience", experienceRoutes);

app.use("/api/destinations", destinationDetailRoutes);
app.use("/api/experience", experienceDetailRoutes);

app.use('/api/auth', authRoutes);

//  Correct (Must explicitly have all 4 arguments)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

export default app;
