const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addtask, edittask, gettask, deletetask, getAllTasks } = require("../services/task");

router.post("/addtask", authMiddleware, addtask);
router.get("/alltasks", authMiddleware, getAllTasks); // New route
router.get("/gettask/:id", authMiddleware, gettask);
router.put("/edittask/:id", authMiddleware, edittask);
router.delete("/deletetask/:id", authMiddleware, deletetask);

module.exports = router;
