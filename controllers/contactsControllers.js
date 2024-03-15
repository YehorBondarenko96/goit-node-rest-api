import contactsService from "../services/contactsServices.js";
import decForFn from "../decorators/decForFuncs.js";
import HttpError from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema, updateStatusContShema } from "../schemas/contactsSchemas.js";

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await contactsService.listContacts({ owner });
    
    res.json(result);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.getOneContact({_id: id, owner});
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.removeContact({_id: id, owner});
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const createContact = async (req, res) => {
    const { error } = createContactSchema.validate(req.body);
    const { _id: owner } = req.user;
    if (error) {
        throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact({...req.body, owner});
    
    res.status(201).json(result);
};

const updateContact = async (req, res) => { 
    if (Object.keys(req.body).length < 1) {
        throw HttpError(400, "Body must have at least one field")
    }
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { _id: owner } = req.user;

    const result = await contactsService.updateContactS({_id: id, owner}, req.body);
    if (!result) {

        throw HttpError(404);
    }
    res.status(200).json(result);
};

const updateStatusCont = async (req, res) => {
    const { error } = updateStatusContShema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { _id: owner } = req.user;

    const result = await contactsService.updateContactS({_id: id, owner}, req.body);
    if (!result) {
        throw HttpError(404);
    }
    res.status(200).json(result);
};

export default {
    getAllContacts: decForFn(getAllContacts),
    getOneContact: decForFn(getOneContact),
    deleteContact: decForFn(deleteContact),
    createContact: decForFn(createContact),
    updateContact: decForFn(updateContact),
    updateStatusCont: decForFn(updateStatusCont)
}
