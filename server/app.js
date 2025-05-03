const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/conn");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userapi = require("./controller/user");
const taskapi = require("./controller/task");
const { addtask } = require("./services/task");

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",  // Not an array, just a string
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));   
app.use(cookieParser()); 

app.get("/", (req, res) => {
    res.send("Hello World");
})

// api's
app.use("/api/v1", userapi);
app.use("/api/v1", taskapi);

app.listen(`${process.env.PORT}`, () => {
    console.log("Server is running on port 1000");
});
