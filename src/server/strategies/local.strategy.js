import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "../models/user.schema";

const localOpts = {
  usernameField: "email",
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
      .select("email password name")
      .exec();

    if (!user) {
      return done(null, false);
    }

    const match = await user.checkPassword(password);

    if (!match) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);

export const authLocal = passport.authenticate('local', {
  session: false
});
