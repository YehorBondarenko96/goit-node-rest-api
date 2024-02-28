import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const result = await contactsService.listContacts();

    res.json(result);
};

export const getOneContact = async (req, res) => {
    const result = await contactsService.getContactById(req.params.id);

    res.json(result);
};

export const deleteContact = async (req, res) => {
    const result = await contactsService.removeContact(req.params.id);

    res.json(result);
};

export const createContact = async (req, res) => {};

export const updateContact = async (req, res) => {};
