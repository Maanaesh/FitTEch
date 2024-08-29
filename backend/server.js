import express from "express";
import dotenv from "dotenv";
import userRoutes from"./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api/User",userRoutes);
app.use("/api/Tasks",taskRoutes)
app.listen(port, () => {
    connectDB();
    console.log(`Server started at port http://localhost:${port} helooo world`);
  });