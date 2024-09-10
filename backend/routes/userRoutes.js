import express from "express";
import { getUsers, login, signUp, updateUsers } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);
router.get("/",getUsers);
router.patch("/",updateUsers);
export default router;
