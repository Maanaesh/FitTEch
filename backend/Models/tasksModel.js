import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const subTaskSchema = new Schema({
    title: String,
    description: String,
    isCompleted: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner:String,
    asignee:String,
    subTasks: [subTaskSchema],
    isCompleted: { type: Boolean, default: false },
  });

  const task = mongoose.model('task',TaskSchema);
  export default task;