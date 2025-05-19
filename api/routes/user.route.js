import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/:id").put(updateUser).delete(deleteUser);

export default router;