const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
registerUser = asyncHandler(async(req,res)=>{
    const {username,password,email} = req.body;

    if(!username || !password || !email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("User Already Registered");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create(
        {
            username,
            password: hashedPassword,
            email,
        }
    );
    res.status(201).json({
        username: username,
        password: hashedPassword,
        email: email
    });
});

loginUser = asyncHandler(async(req,res)=>{
    const {username,password} = req.body;
    if( !email || !password){
        res.status(400);
        throw new Error("Please enter both Email and Password");
    }
    const user = await User.findOne({ email });
    
    if(user && await bcrypt.compare(password,user.password)){
        
        res.status(200).json({accessToken});
    }else{
        res.status(400);
        throw new Error("Invalid User Name or Password");
    }
});

currentUser = asyncHandler(async(req,res)=>{
    res.send("Kya Boltis:Info??");
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};