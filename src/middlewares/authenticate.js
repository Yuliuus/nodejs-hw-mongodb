import createHttpError from "http-errors";

import * as authServices from "../services/auth.js";

const authenticate = async (req, res, next) => {

    const authorization = req.get("Authorization");
    if (!authorization) {
        return next(createHttpError(401, "Please provide Authorization header"));
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return next(createHttpError(401, "Auth header should be of type Bearer"));
    }

    const session = await authServices.findSessionByAccesToken(token);
    if (!session) {
        return next(createHttpError(401, "Session not found"));
    }

    if (new Date() > session.accessTokenValidUntil) {
        return next(createHttpError(401, "Access token expired"));
    }

    const user = await authServices.findUser({ _id: session.userId });
    if (!user) {
        return next(createHttpError(401, "User not found"));
    }

    req.user = user;

    next();
};

export default authenticate;