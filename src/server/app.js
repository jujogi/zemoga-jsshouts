import express from "express";
import expressSession from "express-session";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import { getProfileDetails } from "./controllers/profile.controller"
import { authFacebook, authFacebookCallback } from "./strategies/facebook.strategy";
import userRouter from "./routes/user.route";
import localAuthRouter from "./routes/local-auth.route"
import { authJwt } from "./strategies/jwt.strategy";

const corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true,
}

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

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(
    expressSession({
        resave: true,
        saveUninitialized: false,
        secret: "jsshouts",
        cookie: {
            secure: false
        },
        name: "jsshouts.session"
    })
);

app.use("/local-auth", localAuthRouter);

app.get("/facebook", authFacebook);
app.get('/facebook/callback', authFacebookCallback);

app.get("/home", (req, res) => {
    console.log(req.session);
    const { user } = req.session.passport;
    req.session.accessToken = user.accessToken;
    req.session.save();
    res.status(200).send(user);

    //TODO: Validate user's session
    // Persist the session
    // Create the CORS endpoints
});
app.get("/callback", (req, res) => {
    console.log(req.session);
    const { user } = req.session.passport;
    req.session.accessToken = user.accessToken;
    req.session.user = user;
    req.session.save();
    res.redirect(process.env.CLIENT_URL)

    //TODO: Validate user's session
    // Persist the session
    // Create the CORS endpoints
});
app.get("/profile", authMiddleware, (req, res) => {
    const { user } = req;
    return res.status(200).send(user);
});
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect(process.env.CLIENT_URL)
});

app.use("/user", authMiddleware, userRouter);

app.get("/profile", getProfileDetails);
// TODO : How to add a post in my wall
// can i do another things?

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});