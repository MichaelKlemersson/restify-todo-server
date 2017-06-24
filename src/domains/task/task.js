import mongoose from 'mongoose'

let TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    done: Boolean
});

let Task = mongoose.model('Task', TaskSchema);

export default Task
