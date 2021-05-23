import dotenv from "dotenv";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

import { findOrCreate } from "../services/user.service";

dotenv.config();

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, CALLBACK_URL } = process.env;
const SCOPE = ['user_friends', 'email', 'user_posts', 'user_photos'];

const fbOptions = {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    profileFields: ['id', 'emails', 'displayName']
};

const facebookStrategy = new FacebookStrategy(
    fbOptions,
    async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails } = profile;
        const [{ value: email }] = emails;
        try {
            const user = {
                id,
                name: displayName,
                email,
                accessToken,
            };
            await findOrCreate({
                email,
                name: displayName,
            });
            return done(null, user);
        } catch (e) {
            return done(null, false);
        }
    }
);

passport.use(facebookStrategy);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

const authFacebook = passport.authenticate("facebook", {
    scope: SCOPE
});
const authFacebookCallback = passport.authenticate("facebook", {
    successRedirect: "/callback",
    failureRedirect: "/login"
});

export { authFacebook, authFacebookCallback };
