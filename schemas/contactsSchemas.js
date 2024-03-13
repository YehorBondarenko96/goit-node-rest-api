import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)).required(),
    phone: Joi.string().pattern(/^[+\-\d()]+$/).required(),
    favorite: Joi.boolean().required(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
    phone: Joi.string().pattern(/^[+\-\d()]+$/),
    favorite: Joi.boolean(),
})

export const updateStatusContShema = Joi.object({
    favorite: Joi.boolean().required(),
})