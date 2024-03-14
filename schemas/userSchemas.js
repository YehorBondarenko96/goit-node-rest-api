import Joi from "joi";
import { emailRegexp } from "../constants/user-const.js";

export const userSignupSchem = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

export const userSigninSchem = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
});