import { Router } from "express";

import {
    signinController,
    signupController,
    refreshController,
    signoutController,
    requestResetEmailController,
    resetPasswordController,
} from "../controllers/auth.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {
    userSigninSchema,
    userSignupSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from "../validation/users.js";


const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(signinController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(signoutController));

authRouter.post("/send-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

authRouter.post("/reset-pwd", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));




export default authRouter;

