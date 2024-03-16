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
        throw HttpError(409, "Email is use");
    }
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) { 
        throw HttpError(401, "Email or password not wrong");
    };
    const isValidPass = await authServices.validPass(password, user.password);
    if (!isValidPass) { 
        throw HttpError(401, "Email or password not wrong");
    };

    const { _id: id } = user;

    const payload = { id };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authServices.updateUser({ _id: id }, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
};

const getCurrent = async (req, res) => {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription
    });
};

const signout = async (req, res) => { 
    const { _id } = req.user;

    await authServices.updateUser({ _id }, { token: null });

    res.status(204).json({
        message: "No Content"
    })
};

export default {
    signup: decForFn(signup),
    signin: decForFn(signin),
    getCurrent: decForFn(getCurrent),
    signout: decForFn(signout),
}