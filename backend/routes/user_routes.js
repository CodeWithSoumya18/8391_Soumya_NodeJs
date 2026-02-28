import express from "express";
import { body } from "express-validator";
import {
  createuser,
  getUsers,
  multipleDelete,
  softDeleteUser,
  updateUser,
} from "../controllers/user_controller.js";
const router = express.Router();


router.post("/create", createuser);
router.get("/get", getUsers);
router.put("/update", updateUser);
router.delete("/delete", softDeleteUser);
router.put("/multiple-delete", multipleDelete);

export default router;
