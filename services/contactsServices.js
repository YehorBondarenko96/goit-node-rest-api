import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';;

const contactsPath = path.resolve("db", "contacts.json");
const updateContactlist = list => fs.writeFile(contactsPath, JSON.stringify(list, null, 4));


export async function listContacts() {
    const list = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(list)
}

export async function getContactById(contactId) {
    const listString = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(listString);
    const index = list.findIndex(c => c.id === contactId);
    if(index === -1){
        return null
    };
    const contact = list[index];
    return contact
}

export async function removeContact(contactId) {
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

export async function addContact(name, email, phone) {
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    const listString = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(listString);
    list.push(newContact);
    await updateContactlist(list);
    return newContact
}

export async function updateContactById(contactId, data) {
    const listString = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(listString);
    const index = list.findIndex(c => c.id === contactId);
    if(index === -1){
        return null
    };
    list[index] = {...list[index], ...data}
    await updateContactlist(list);
    return list[index]
}