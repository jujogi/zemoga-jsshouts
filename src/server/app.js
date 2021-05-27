import express from "express";
import expressSession from "express-session";
import passport from "passport";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";

// Midleware & Controllers
import { authMiddleware } from "./middleware/auth.middleware";
import { saveSession, destroySession } from "./controllers/session.controller";
// Routes
import facebookRouter from "./routes/facebook.route";
import userRouter from "./routes/user.route";
import apiRouter from "./routes/api.route";
import localAuthRouter from "./routes/local-auth.route";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: "jsshouts",
        cookie: {
            secure: true,
            sameSite: "none"
        },
        name: "jsshouts.session"
    })
);

// User & Password Strategy
app.use("/local-auth", localAuthRouter);

// Oauth2 Facebook Strategy
app.use("/facebook", facebookRouter);
app.use("/me", authMiddleware, apiRouter);

// When login process was successfully 
app.get("/callback", saveSession);

// Get users list
app.use("/user", authMiddleware, userRouter);

app.get("/logout", destroySession);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});