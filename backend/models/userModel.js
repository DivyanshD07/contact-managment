const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        userName : {
            type: String,
            required: [true, "Please write your name"]
        },
        userEmail : {
            type: String,
            required: [true, "Please write your email"],
            uniqure: [true, "Email id already exists"]
        },
        password: {
            type: String,
            required: [true, "Please enter your password"]
        },
        // userPhoneNo : {
        //     type: String,
        //     required: [true, "Please write your phone number"]
        // },
    },
    {
        timeStamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);