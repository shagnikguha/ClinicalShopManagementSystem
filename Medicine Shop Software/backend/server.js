import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv';
import connectToMongoDB from "./db/mongodbconn.js";
import router from "./auth/authRoutes.js";
import { cartrouter } from "./auth/cartRoutes.js";
import searchRouter from "./auth/searchRoutes.js";
import PaymentRouter from "./auth/paymentRoutes.js";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from 'passport-google-oauth20';
import bcrypt from "bcrypt";
import User from "./models/customerModel.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Load .env from root directory

const app = express();
const port = process.env.PORT || 3000;

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/public')));
console.log(process.env.SESSION_SECRET);
// Initialize session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Mount router after initializing Passport and session middleware
app.use(router);
app.use(searchRouter);
app.use(cartrouter);
app.use(PaymentRouter);


// Root Route
app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`);
});

// Passport Local Strategy
passport.use(new LocalStrategy( async function verify(email, password, cb) {
    try {
        const user = await User.findOne({ email: email }); // Use findOne for efficiency
        if (!user) {
            return cb(null, false, { message: "User doesn't exist" });
        }

        if (user.googleId) {
            console.log("User registered through Google auth. Please log in using Google.")
            return cb(null, false, { message: "User registered through Google auth. Please log in using Google." });
        }

        const isMatch =  bcrypt.compare(password, user.password);
        if (isMatch) {
            return cb(null, user); // Successful authentication
        } else {
            return cb(null, false, { message: "Incorrect password" });
        }
    }
    catch (err) {
        return cb(err);
    }
}));

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3000/auth/google/secrets" , // Using environment variable
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const email = profile.emails[0].value;
            const googleId = profile.id;
            const name = profile.displayName; // Accessing displayName

            let user = await User.findOne({ email: email });

            if (user) {
                if (user.password) {
                    // User registered via Local Auth, cannot login via Google
                    return cb(null, false, { message: 'User registered using local auth. Please log in using email and password.' });
                } else {
                    // User registered via Google OAuth
                    return cb(null, user);
                }
            } else {
                // Create new user via Google OAuth
                const newUser = new User({
                    name: name,
                    email: email,
                    googleId: googleId,
                    // No password needed
                });
                await newUser.save();
                return cb(null, newUser);
            }
        }
        catch (err) {
            return cb(err);
        }
    }
));

// Serialize user by ID
passport.serializeUser((user, cb) => {
    cb(null, user);
});

// Deserialize user by fetching from DB
passport.deserializeUser( (user, cb) => {
   cb(null,user);
});

// Start the server
app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is ready to listen on port ${port}`);
});
