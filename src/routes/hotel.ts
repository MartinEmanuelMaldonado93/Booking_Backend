import express from "express";
// const express = require("express");
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotelById,
  getHotels,
  updateHotel,
} from "../controllers/Hotel.controller";
import { authJWT } from "../middleware/auth";

const router = express.Router();

// CREATE
router.post("/", createHotel);
// UPDATE
router.put("/:id", updateHotel);
// DELETE
router.delete("/:id", deleteHotel);
// GET
router.get("/", getHotels);
router.get("/find/:id", getHotelById);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
