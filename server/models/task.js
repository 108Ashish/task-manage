const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }
});

// ✅ Use existing model if it exists, else create a new one
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;
