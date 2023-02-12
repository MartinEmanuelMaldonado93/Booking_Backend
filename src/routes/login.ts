import express from "express";
import { SignIn, SignUp } from "../controllers/Sign.controller";

const router = express.Router();

router.post("/register", SignUp);
router.post("/login", SignIn);

export default router;
