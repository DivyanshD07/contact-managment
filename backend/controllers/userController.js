const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

//@description Register a User
//@route /api/users/register
//@access public
const userRegister = asyncHandler ( async( req, res ) => {

    const {username, email, password} = req.body;
    
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User aleardy exists");
    }


    res.status(200).json({ message: "Register a user" })
});


//@description User login
//@route /api/users/login
//@access public
const userLogin = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Login a user" })
});

//@description Current user
//@route /api/users/current
//@access public
const userCurrent = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Current user information" })
});

module.exports = {userRegister, userLogin, userCurrent};