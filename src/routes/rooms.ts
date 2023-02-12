import express from "express";
import {
  createRoom,
  deleteRoom,
  getRooms,
  getRoom,
  updateRoom,
} from "../controllers/Room.controller";

const router = express.Router();
// CREATE
router.post("/:hotelid", createRoom);
// UPDATE
router.put("/:id", updateRoom);
// DELETE
router.delete("/:id", deleteRoom);
// GET
router.get("/", getRooms);
router.get("/:id", getRoom);

export default router;
