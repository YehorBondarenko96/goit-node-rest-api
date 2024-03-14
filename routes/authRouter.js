import express from "express";
import authControllers from "../controllers/authControllers.js";
import { userSignupSchem, userSigninSchem } from "../schemas/userSchemas.js";
import validateBody from "../decorators/validateBody.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userSignupSchem), authControllers.signup);
authRouter.post("/signin", validateBody(userSigninSchem), authControllers.signin);


export default authRouter;