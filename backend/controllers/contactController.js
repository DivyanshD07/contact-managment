//@description get all contacts
//@route Get /api/contacts
//@access public
const getContact = (req, res) => {
    res.status(200).json({message: "Get all contacts"})
};

//@description get contact by id
//@route Get /api/contacts/:id
//@access public
const getContactById = (req,res) => {
    res.status(200).json({message: `Get contact ${req.params.id}`})
};

//@description create contact
//@route Get /api/contacts
//@access public
const createContact = (req, res) => {
    console.log("The received details are: ", req.body);
    const { name, email, phoneNo } = req.body;
    if(!name || !email || !phoneNo) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    res.status(200).json({message: "Create new Contact"})
};

//@description update contact by id
//@route Get /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(200).json({message: `Update contact ${req.params.id}`})
};

//@description delete contact by id
//@route Get /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    res.status(200).json({message: `Delete contact ${req.params.id}`})
};

module.exports = {getContact, getContactById, createContact, updateContact, deleteContact};