// This is the router for users
// users registration, login, logout
// creating a new user
// getting all users
require("dotenv").config();
const express = require('express')
const userRouter = express.Router();
const {User, Note} = require('../models/user.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
userRouter.use(cookieParser());
userRouter.use(express.urlencoded({extended: true}));



userRouter.get("/register", (req,res)=>{
    res.render("auth/register.ejs", {layout: "layouts/auth.ejs"})
});

userRouter.get("/login", (req,res)=>{
    res.render("auth/login.ejs", {layout: "layouts/auth.ejs"})
});

userRouter.post("/register", async (req, res)=>{
    try {
        const founduser = await User.findOne({email: req.body.email});
        if(founduser) {
            console.log("user already exists")
            return res.redirect("/users/login");
        }
        const hashedpassword =  await bcrypt.hash(req.body.password, 6);
        const newUser = new User({name: req.body.name, email: req.body.email, password: hashedpassword});
        await newUser.save();
        return res.redirect("/users/login")
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Failed to create user"})
    }
});

userRouter.post("/login", async (req,res)=> {
    const data = req.body;
    try {
        const founduser = await User.findOne({email: req.body.email});
        if(founduser) {
            // check the password if they match or not
            const passwordMatch = await bcrypt.compare(data.password, founduser.password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: founduser._id, email: founduser.email }, process.env.secret_key);
                const userId = founduser._id;
                // Send the token as a response or store it in a cookie
                res.cookie(`token`, token)
                //, { httpOnly: true, secure: true, sameSite: 'strict' }
                return res.redirect('/notes');
            } else {
                // Passwords do not match
                console.log('Invalid credentials');
            }
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.log(error)
    }
});

userRouter.get("/logout", verifyToken, (req, res) => {
    const userId = req.userId;
    res.clearCookie(`token`);
    res.redirect("/users/login");
});

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, process.env.secret_key, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } 
      req.userId = decoded.userId;
      next();
    });
  }

module.exports = userRouter;
    