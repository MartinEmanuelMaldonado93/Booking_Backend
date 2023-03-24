import express from "express";
import {
  createRoom,
  deleteRoom,
  getRooms,
  getRoom,
  updateRoom,
} from "../controllers/Room.controller";
import { authJWT } from "../middleware/auth";

const router = express.Router();
// CREATE
router.post("/:hotelid", createRoom);
// UPDATE
router.put("/:id", updateRoom);
// DELETE
router.delete("/:id", deleteRoom);
// GET
router.get("/", authJWT, getRooms);
router.get("/:id", authJWT, getRoom);

export default router;
