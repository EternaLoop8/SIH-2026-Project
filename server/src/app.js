import express from "express";

const app = express();

// Standard middleware
app.use(express.json());

// You can add your app.use("/api", routes) code here later

export default app;