const mongoose = require("mongoose")

const contactSchema = mongoose.Schema(
    {
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