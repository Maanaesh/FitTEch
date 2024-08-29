import express from "express";
import { createTask, getTaskById,updateTask} from "../controllers/taskController.js";
const router = express.Router();

router.post("/createTask",createTask);
router.get("/getTasksForAssignee/:id",getTaskById);
router.put("/updateTask/:taskId",updateTask)
export default router;