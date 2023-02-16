import express from "express";
import {
  createRoom,
  deleteRoom,
  getRooms,
  getRoom,
  updateRoom,
} from "../controllers/Room.controller";
import { authorization } from "../middleware/auth";

const router = express.Router();
// CREATE
router.post("/:hotelid", createRoom);
// UPDATE
router.put("/:id", updateRoom);
// DELETE
router.delete("/:id", deleteRoom);
// GET
router.get("/", authorization, getRooms);
router.get("/:id", authorization, getRoom);

export default router;
