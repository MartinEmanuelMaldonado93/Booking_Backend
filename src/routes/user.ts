import express from "express";
import {
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/User.controller";

const router = express.Router();
// GET
router.get("/:id", getUserById); //admin
// GET ALL
router.get("/", getUsers); //admin
// UPDATE
router.put("/:id", updateUser); //verify user
// DELETE
router.delete("/:id", deleteUser); //verify user

export default router;
