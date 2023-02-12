import "./database/db";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connect } from "./database/db";
import { hotel, login } from "./routes";

const app = express();
dotenv.config();
const port = process.env.PORT || 8800;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", hotel);
app.use("/api/auth", login);
// app.use("/api/users", usersRoute);
// app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong!";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });

app.listen(port, () => {
  connect();
  console.log(`Example app listening at http://localhost:${port}`);
});
