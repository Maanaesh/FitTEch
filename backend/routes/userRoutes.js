import express from "express";
import { getUsers, login, signUp } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);
router.get("/",getUsers);

export default router;
