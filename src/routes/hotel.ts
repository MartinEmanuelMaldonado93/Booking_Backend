import express from "express";
import { getHotels } from "../controllers/Hotel.controller";

const router = express.Router();

router.get("/hotels", getHotels);

export default router;
