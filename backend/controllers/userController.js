const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@description Register a User
//@route /api/users/register
//@access public
const userRegister = asyncHandler(async (req, res) => {

    const { userName, userEmail, password } = req.body;

    if (!userName || !userEmail || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ userEmail });
    if (userAvailable) {
        res.status(400);
        throw new Error("User aleardy exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({ message: "Hashed password: ", hashedPassword });

    const user = await User.create({
        userName,
        userEmail,
        password: hashedPassword,
    });

    console.log({ message: `User created ${user}` });
    if (user) {
        res.status(201).json({ _id: user.id, Email: user.userEmail });
    } else {
        res.status(400);
        throw new Error("User details not valid")
    }
    res.status(200).json({ message: "Register a user" })
});


//@description User login
//@route /api/users/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
    const { userEmail, password } = req.body;
    if (!userEmail || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ userEmail });

    //compare password with hashpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                userEmail: user.userEmail,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );
        res.status(200).json({ accessToken });
    } else{
        res.status(400);
        throw new Error("email or password is not valid");
    }
});

//@description Current user
//@route /api/users/current
//@access private
const userCurrent = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { userRegister, userLogin, userCurrent };