
async function getContactById(contactId) {
    const listString = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(listString);
    const index = list.findIndex(c => c.id === contactId);
    if(index === -1){
        return null
    };
    const contact = list[index];
    return contact
}

async function removeContact(contactId) {
    const listString = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(listString);
    const index = list.findIndex(c => c.id === contactId);
    if(index === -1){
        return null
    };
    const [contForDel] = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 4));
    return contForDel
}

async function updateContactById(contactId, data) {
    const listString = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(listString);
    const index = list.findIndex(c => c.id === contactId);
    if(index === -1){
        return null
    };
    console.log('list[index]: ', list[index]);
    list[index] = {...list[index], ...data}
    console.log('list[index]: ', list[index]);
    await updateContactlist(list);
    return list[index]
}

import Contact from "../models/Contact.js";

const listContacts = () => Contact.find();
const addContact = data => Contact.create(data);

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById
}