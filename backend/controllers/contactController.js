const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModels")


//@description get all contacts
//@route Get /api/contacts
//@access private
const getContact = asyncHandler (async (req, res) => {
    const contacts = await Contact.find({ userId: req.user.id });
    if(!contacts) {
        res.status(404);
        throw new Error("Contacts not found");
    }
    res.status(200).json(contacts);
});

//@description get contact by id
//@route Get /api/contacts/:id
//@access private
const getContactById = asyncHandler (async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

//@description create contact
//@route Get /api/contacts
//@access private
const createContact = asyncHandler ( async (req, res) => {
    console.log("The received details are: ", req.body);
    const { name, email, phoneNo } = req.body;
    if(!name || !email || !phoneNo) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phoneNo,
        userId: req.user.id,
    })
    res.status(201).json(contact);
});

//@description update contact by id
//@route Get /api/contacts/:id
//@access private
const updateContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

//@description delete contact by id
//@route Get /api/contacts/:id
//@access private
const deleteContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContact, getContactById, createContact, updateContact, deleteContact};