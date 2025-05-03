const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/conn");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userapi = require("./controller/user");
const taskapi = require("./controller/task");

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(cookieParser()); 

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/v1", userapi);
app.use("/api/v1", taskapi);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
