import HttpError from "../helpers/HttpError.js";
import decForFn from "../decorators/decForFuncs.js";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";

const avatarPath = path.resolve("public", "avatars");

dotenv.config();

const {JWT_SECRET} = process.env;

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({email});
    if (user) {
        throw HttpError(409, "Email is use");
    }
    const avatar = gravatar.url(email, {s: 250, d: 'identicon'});
    const newUser = await authServices.signup({...req.body, avatarURL: `https:${avatar}`});

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

const setSubsc = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    await authServices.updateUser({ _id }, { subscription });
    res.status(200).json({
        message: "Subscription successfully updated"
    })
};

const setAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);

    await fs.rename(oldPath, newPath);

    const avatarImage = await Jimp.read(newPath);
    await avatarImage.resize(250, 250).writeAsync(newPath);

    const avatar = path.join("avatars", filename);
    await authServices.updateUser({ _id }, { avatarURL: avatar });
    res.status(200).json({
        avatarURL: avatar
    })
};

export default {
    signup: decForFn(signup),
    signin: decForFn(signin),
    getCurrent: decForFn(getCurrent),
    signout: decForFn(signout),
    setSubsc: decForFn(setSubsc),
    setAvatar: decForFn(setAvatar)
}