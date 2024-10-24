import User from '../models/customerModel.js';
import bcrypt from 'bcrypt'

const saltRounds = 10;

const login_post = async (req, res) => {
    try{
    const { username } = req.body;
    const { password } = req.body;

    const user = await User.find({ email: username });// find if user exists in db
    console.log(user)
    if (user[0]) {
        await bcrypt.compare(password, user[0].password, function (err, result) {
            if (err) {
                res.status(503).json({ msg: 'Server side error' });
            }

            else {
                if (result) {
                    const name = user[0].name;
                    res.status(200).json({ msg: `User ${name} is being redirected.. ` });  //if password is correct ,redirect user
                }

                else {
                    res.status(401).json({ msg: `Wrong password!! ` });// wrong password handling
                }
            }
        })
    }

    else {
        res.status(401).json({ msg: `Username doesn't exist!` }); //if user doesn;t exist in db
    }
}
 catch(err){
    console.error('Some error:',err.message);
    res.json()
 }
}

const register_post = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if user already exists
        const isUser = await User.findOne({ email: email });
        if (isUser) {
            if(isUser.googleId){
                return res.render('login', { 
                    error: true,  
                    errmssg: "User authenticated through google!",
                    currentView: 'login' 
                });  
            }
            return res.render('login', { 
                error: true, 
                errmssg: "User already exists!",
                currentView: 'login' 
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = new User({
            name: name,
            password: hashedPassword,
            email: email,
        });

        if(req.body.number){
            user.phone = req.body.number;
        }

        // Save the user to the database
        await user.save();

        // Respond with success
        res.redirect('/login')
    } catch (err) {
        console.error('Registration error:', err.message);
        return res.render('login', { 
            error: true,
            errmssg: 'Internal server error',
            currentView: 'register'
        });
    }
}

export { login_post, register_post };

