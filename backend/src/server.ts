import express from 'express'
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3008",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(errorHandler);

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running",
  });
});

const PORT = process.env.PORT || 8080;

await connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});