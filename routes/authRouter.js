import express from "express";
import authControllers from "../controllers/authControllers.js";
import { userSignupSchem, userSigninSchem } from "../schemas/userSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchem), authControllers.signup);
authRouter.post("/login", validateBody(userSigninSchem), authControllers.signin);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.signout);
authRouter.patch("/", authenticate, authControllers.setSubsc);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), authControllers.setAvatar);

export default authRouter;