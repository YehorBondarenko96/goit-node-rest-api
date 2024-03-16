import Contact from "../models/Contact.js";

const listContacts = (filter = {}, query = {}) => Contact.find(filter, "-createdAt -updatedAt ", query);
const addContact = data => Contact.create(data);
const getOneContact = filter => Contact.findOne(filter);
const updateContactS = (filter, data) => Contact.findOneAndUpdate(filter, data);
const updateStatusContact = (filter, fav) => Contact.findOneAndUpdate(filter, {favorite: fav});
const removeContact = filter => Contact.findOneAndDelete(filter);

export default {
    listContacts,
    getOneContact,
    removeContact,
    addContact,
    updateContactS,
    updateStatusContact
}