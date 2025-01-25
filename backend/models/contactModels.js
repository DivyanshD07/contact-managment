const mongoose = require("mongoose")

const contactSchema = mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Please add a contact name"]
        },
        email: {
            type: String,
            required: [true, "Please add the contact email"]
        },
        phoneNo: {
            type: String,
            required: [true, "Please add the contact number"]
        },
    },
    {
        TimeRanges: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);