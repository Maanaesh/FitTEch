import task from "../Models/tasksModel.js";
import fitUser from "../Models/userModel.js"
import mongoose from "mongoose";
export const createTask = async (req,res)=>{
    const taskData = req.body;
    if(!taskData.title||!taskData.description||!taskData.asignee){
        return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
    }
    const newTask= new task(taskData);
    try {
        await newTask.save();
        res.status(200).json({ success: true, data: newTask });
      } catch (error) {
        console.error(`error in create task ${error.message}`);
        return res.status(500).json({ success: false, message: "Server Error" });
      }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await fitUser.findById(id);  

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const tasks = await task.find({ asignee: user.email });

    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error in fetching tasks:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTask = async (req,res)=>{
  const { taskId } = req.params;
  const updatedTaskData = req.body;
  try {
    const updatedTask = await task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: updatedTask });
  }
  catch(error){
    console.error('Error updating task:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}