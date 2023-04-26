import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connect } from "./database";
import { hotel, login, rooms, user } from "./routes";
import { checkEnviromentVariables } from "./helpers/checkEnv";

const app = express();

dotenv.config({ path: ".env" });
// checkEnviromentVariables();

const port = process.env.PORT || 8800;
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/hotels", hotel);
app.use("/api/auth", login);
app.use("/api/users", user);
app.use("/api/rooms", rooms);

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
