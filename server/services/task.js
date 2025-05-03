const Task = require("../models/task");

const User = require("../models/user");

const addtask = async (req, res) => {
   try {
    console.log("Request body:", req.body);
    console.log("User from request:", req.user);
    
    const { title, description, priority, status } = req.body;
    const { user } = req;
    
    if(!user) {
        console.log("No user found in request");
        return res.status(401).json({error:"Authentication required"});
    }
    
    console.log("User ID:", user._id);
    console.log("User tasks:", user.tasks);
    
    if(!title || !description) {
        return res.status(400).json({error:"Please fill all the fields"});
    }
    
    // Create task with all user details
    const newTask = new Task({
        title,
        description,
        priority: priority || 'low',
        status: status || 'pending',
        user: user._id,
        username: user.username,
        email: user.email
    });
    
    console.log("New task object:", newTask);
    
    // Save task first
    const savedTask = await newTask.save();
    console.log("Task saved:", savedTask);
    
    // Update user with tasks array check
    if (!Array.isArray(user.tasks)) {
        user.tasks = [];
    }
    
    user.tasks.push(savedTask._id);
    await user.save();
    
    res.status(201).json({success:"Task added successfully", task: savedTask});

   } catch(err) {
    console.error("Error adding task:", err);
    return res.status(500).json({error:"Internal server error"})
   }
};

// edit task

const edittask = async (req, res) => {
   

    try{
        const {id}=req.params;
     const { title, description, priority, status } = req.body;
     //const{user}=req.user;
     if(!title || !description ){
         return res.status(400).json({error:"Please fill all the fields"})
     }
     if(title.length<3){
         return res.status(400).json({error:"Title must be at least 3 characters long"})
     }
     if(description.length<6){
         return res.status(400).json({error:"Description must be at least 6 characters long"})
     }
 
     await Task.findByIdAndUpdate(id,{
         title,
         description,
         priority,
         status,
     })
     res.status(201).json({success:"Task updated successfully"})  
 
    }catch(err){
     
     return res.status(500).json({error:"Internal server error"})
    }
 }


 //gettask
const gettask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskDetails = await  Task.findById(id);
        return res.status(200).json({ taskDetails });
    
} 
catch (error) {
        //console.error("Error fetching task details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// get all tasks
const getAllTasks = async (req, res) => {
    try {
        const { user } = req;
        
        if(!user) {
            return res.status(401).json({error:"Authentication required"});
        }
        
        // Find all tasks for this user
        const allTasks = await Task.find({ user: user._id }).sort({ createdAt: -1 });
        
        // Categorize tasks by status
        const pendingTasks = allTasks.filter(task => task.status === 'pending');
        const inProgressTasks = allTasks.filter(task => task.status === 'in-progress');
        const completedTasks = allTasks.filter(task => task.status === 'completed');
        
        console.log("Tasks found:", {
            pending: pendingTasks.length,
            inProgress: inProgressTasks.length,
            completed: completedTasks.length
        });
        
        console.log("First pending task:", pendingTasks[0]); // Show a sample task

        res.status(200).json({
            success: true,
            tasks: {
                pending: pendingTasks,
                inProgress: inProgressTasks,
                completed: completedTasks
            }
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({error:"Internal server error"});
    }
};

// delete task

const deletetask = async (req, res) => {
    try {
        const { id } = req.params;
       await Task.findByIdAndDelete(id);
        res.status(200).json({ success: "Task deleted successfully" });
} 
catch (error) {
        //console.error("Error fetching task details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    addtask,
    gettask,
    getAllTasks, // New export
    edittask,
    deletetask
};