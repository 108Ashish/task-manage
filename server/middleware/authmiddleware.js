const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.taskmanager;

try{
    if(!token) {
        return res.status(401).json({ error: "new-user" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log("user:", user);
    if(!user) {
        return res.status(401).json({ message: "user-not-found" });
    }
    req.user = user;
    next();

}
catch(error) {
    res.status(401).json({ message: "invalid-token" });
}

};

module.exports = authMiddleware;