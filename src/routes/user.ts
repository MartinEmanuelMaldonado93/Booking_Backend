import express from "express";
import {
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/User.controller";
import { authorization } from "../middleware/auth";

const router = express.Router();
// GET
router.get("/:id", getUserById); //admin
// GET ALL
router.get("/", getUsers); //admin
// UPDATE
router.put("/:id", authorization, updateUser); //verify user
// DELETE
router.delete("/:id", authorization, deleteUser); //verify user

export default router;
