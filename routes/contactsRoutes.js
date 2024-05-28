const express=require('express');
const router = express.Router();
const {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact,
} = require('../controller/contactController');

router.route('/').get(getContacts).post(createContact);

router.route('/:id').put(updateContact).get(getContact).delete(deleteContact);

module.exports=router;