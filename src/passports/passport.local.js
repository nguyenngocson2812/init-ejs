// passport local
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userModel from '../models/user.model.js';

const initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const user = await userModel.findByEmail(email);
            if (!user) {
                return done(null, false, { message: 'No user found with that email.' });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (error) {
            console.error(error);
            return done(error, false);
        }
    }));
};

export default initPassportLocal;
