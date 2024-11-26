import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import passport from 'passport';
import expressLayouts from 'express-ejs-layouts';
import clientRoutes from './routes/client/index.route.js';
import adminRoutes from './routes/admin/index.route.js';
import userModel from './models/user.model.js';
import initPassportLocal from './passports/passport.local.js';
import initPassportGoogle from './passports/passport.google.js'; // Consider using this if implementing Google strategy

// Use `path.dirname` for cleaner directory management
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from `.env` file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware setup
app.use(flash());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session management with a descriptive cookie name
app.use(session({
    name: 'userSession', // Descriptive session cookie name
    secret: process.env.SESSION_SECRET, // Ensure the secret is not logged
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport strategies
initPassportLocal();
initPassportGoogle(); // Initialize Google strategy if needed

app.use(passport.initialize());
app.use(passport.session());

// Serialize user to save in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user to retrieve from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findByPk(id);
        done(null, user); // Save user information to request
    } catch (error) {
        done(error); // Handle errors gracefully
    }
});

// View engine and layout setup
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount client and admin routes
clientRoutes(app);
adminRoutes(app);

// Start the server
const { PORT, HOST_NAME } = process.env;
app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is running at http://${HOST_NAME}:${PORT}/`);
});
