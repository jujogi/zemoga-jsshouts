import { authJwt } from "../strategies/jwt.strategy";

const authMiddleware = (req, res, next) => {
    try {
        const { user } = req.session.passport;
        if (user) {
            req.user = user;
            next();
            return;
        }
        authJwt(req, res, next);
    } catch {
        authJwt(req, res, next);
    }
}

export {
    authMiddleware,
}