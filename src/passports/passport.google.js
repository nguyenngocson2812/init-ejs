import dotenv from 'dotenv';
import path from 'path';
import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
// import User from './models/User'; // Uncomment to use User model

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize Google OAuth strategy
const initPassportGoogle = () => {
    const { HOST_NAME, PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

    // Configure Google OAuth strategy
    const googleStrategyConfig = {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `http://${HOST_NAME}:${PORT}/auth/google/callback`,
        scope: ['email', 'profile'], // Define the required scopes here
    };

    const googleCallback = async (accessToken, refreshToken, profile, done) => {
        console.log(profile); // Log the user profile for debugging
        try {
            // Find or create user in your database
            // const [user] = await User.findOrCreate({ where: { googleId: profile.id } });
            // done(null, user); // Uncomment this line after implementing user retrieval/creation
            done(null, profile); // For now, just return the profile
        } catch (err) {
            console.error('Error during Google authentication:', err);
            done(err);
        }
    };

    passport.use(new GoogleStrategy(googleStrategyConfig, googleCallback));
};

export default initPassportGoogle;