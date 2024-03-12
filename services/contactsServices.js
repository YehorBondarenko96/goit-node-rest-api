import Contact from "../models/Contact.js";

const listContacts = () => Contact.find();
const addContact = data => Contact.create(data);
const getContactById = contactId => Contact.find({ _id: contactId });
const updateContactById = (contactId, data) => Contact.findByIdAndUpdate({ _id: contactId }, data);
const updateStatusContact = (contactId, fav) => Contact.findByIdAndUpdate({_id: contactId}, {favorite: fav});
const removeContact = contactId => Contact.findByIdAndDelete(contactId);

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
    updateStatusContact
}