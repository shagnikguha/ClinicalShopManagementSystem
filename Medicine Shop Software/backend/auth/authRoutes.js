import { Router } from "express";
import { login_post, register_post } from "../controllers/authcontroller.js";
import passport from "passport";
const router = Router();

// Registration Route
router.post('/register', register_post);

router.get('/register',(req,res)=>{
    res.render('login');
})

// Login Route using Passport's authenticate middleware
router.post('/login', passport.authenticate("local", {
    successRedirect: "/search",
    failureRedirect: "/login",
}));

// Route to render 'hometype' view

// Route to render 'login' view
router.get('/login', (req, res) => {
    res.render('login'); 
});

// Protected Route: '/secrets'
router.get('/secrets', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('secrets'); 
    } else {
        res.redirect('/login');
    }
});

router.get('/auth/google',passport.authenticate("google",{
    scope:["profile","email"],
}));

router.get('/auth/google/secrets',passport.authenticate("google",{
    successRedirect: '/search',
    failureRedirect: '/login',
}))

export default router;
