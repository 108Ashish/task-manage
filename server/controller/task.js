const express = require("express");
const router = express.Router(); // ✅ lowercase

const authMiddleware = require("../middleware/authMiddleware");
const { addtask, edittask, gettask, deletetask } = require("../services/task");

router.post("/addtask", authMiddleware, addtask);
router.post("/edittask/:id", authMiddleware, edittask);
router.post("/gettask/:id", authMiddleware, gettask);
router.post("/deletetask/:id", authMiddleware, deletetask);

module.exports = router;
 