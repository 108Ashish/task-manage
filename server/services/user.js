const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Controller
const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (username.length < 5) {
        return res.status(400).json({ error: "Username must be at least 5 characters long" });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    try {
        const checkUser = await User.findOne({ $or: [{ email }, { username }] });
        if (checkUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            tasks: [] 
        });
        await newUser.save();

        res.status(201).json({ success: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.cookie("taskmanager", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",  
            path: "/"  
        });

        return res.status(200).json({
            success: "Login successful",
            
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
      res.clearCookie("taskmanager", {
        httpOnly: true,
         
      });
  
      return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const userDetails = async (req, res) => {
    try {
        
        const user = req.user;
        const getDetails = await User.findById(user._id).populate("tasks").select("-password");
        if(getDetails){
            const allTasks= getDetails.tasks;
            let pending=[];
            let completed=[];
            let inProgress=[];
            allTasks.map((item)=>{
                if(item.status==="pending"){
                    pending.push(item);
                }
                else if(item.status==="completed"){
                    completed.push(item);
                }
                else{
                    inProgress.push(item);
                }
            })
            return res.status(200).json({success:"success", tasks:[{pending},{completed},{inProgress}]});
        }
    } catch (error) {
       // console.error("Error fetching user details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const { user } = req;
        if (!user) {
            return res.status(401).json({ error: "Authentication required" });
        }
        
       
        const userWithTasks = await User.findById(user._id)
            .populate('tasks')
            .select('-password');  
            
        res.status(200).json({ 
            success: true,
            user: userWithTasks
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    register,
    login,
    logout,
    userDetails,
    getUserDetails
};
