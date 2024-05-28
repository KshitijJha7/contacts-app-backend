const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel');
// GET
const getContacts = asyncHandler(async (req,res)=>{
    const contact = await Contact.find();
    res.status(200).json(contact)
});
//GET
const getContact = asyncHandler(async (req,res)=>{
    console.log("here");
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        console.log("Contact not found");
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//POST
const createContact = asyncHandler(async (req,res)=>{
    const {name,phone,email} = req.body;
    if(!name | !phone | !email ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact= await Contact.create(
        {
            name,
            email,
            phone,
        }
    );
    res.status(201).json(contact);
});
//PUT
const updateContact =asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact= await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updateContact);
});
//DELETE
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});

module.exports={
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact,
};