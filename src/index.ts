import "./lib/db";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connect } from "./lib/db";

const app = express();
dotenv.config();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
// app.use(express.raw({ type: "application/vnd.custom-type" }));
// app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ message: "roooot" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`Example app listening at http://localhost:${port}`);
});
