import express from "express";
import expressSession from "express-session";
import passport from "passport";
import cors from "cors";
import { authFacebook, authFacebookCallback } from "./strategies/facebook.strategy";
import { json, urlencoded } from "body-parser";

const PORT = 3000;

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(
    expressSession({
        resave: true,
        saveUninitialized: false,
        secret: "jsshouts",
        cookie: {
            secure: false
        }
    })
);

app.get("/facebook", authFacebook);
app.get('/facebook/callback', authFacebookCallback);

app.get("/home", (req, res) => {
    const { user } = req.session.passport;
    res.status(200).send(user);

    //TODO: Validate user's session
    // Persist the session
    // Create the CORS endpoints
});



app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});