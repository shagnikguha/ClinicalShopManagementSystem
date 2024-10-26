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
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.render('login', { 
                error: true,
                errmssg: 'An error occurred during login.'
            });
        }
        
        if (!user) {
            // This will show the message from LocalStrategy
            return res.render('login', { 
                error: true,
                errmssg: info.message 
            });
        }
        
        req.logIn(user, (err) => {
            if (err) {
                return res.render('login', { 
                    error: true,
                    errmssg: 'An error occurred during login.'
                });
            }
            return res.redirect('/search');
        });
    })(req, res, next);
});

// Route to render 'hometype' view

// Route to render 'login' view
router.get('/login', (req, res) => {
    res.render('login'); 
});

router.get('/ocr',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('ocr');
    }

    else{
        res.redirect('/login');
    }
});

router.get('/auth/google',passport.authenticate("google",{
    scope:["profile","email"],
}));

router.get('/auth/google/secrets',passport.authenticate("google",{
    successRedirect: '/search',
    failureRedirect: '/login',
}));

router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return res.json({err:err}) }
      res.redirect('/');
    });
  });

export default router;
