import HttpError from "../helpers/HttpError.js";
import decForFn from "../decorators/decForFuncs.js";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {JWT_SECRET} = process.env;

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({email});
    if (user) {
        throw HttpError(409, "Email is using");
    }
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        email: newUser.email
    })
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) { 
        throw HttpError(401, "Email or password not valid");
    };
    const isValidPass = await authServices.validPass(password, user.password);
    if (!isValidPass) { 
        throw HttpError(401, "Email or password not valid");
    };

    const payload = {id: user._id};

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});

    res.json({
        token
    })
};

export default {
    signup: decForFn(signup),
    signin: decForFn(signin)
}