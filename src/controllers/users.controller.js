const userCtrl = {};

const User = require('../models/User');

userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};


userCtrl.signup = async (req, res) => {
    const errors = [];
    const  { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match'})
    }
    if (password.length < 4) {
        errors.push({text: 'Passwords must be at least 4 characters.'})
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password
        })
    } else {
       const emailUser = await User.findOne({email: email});
       if(emailUser) {
           req.flash('error_msg', 'The email is already in use.');
           res.redirect('/users/signup');
       } else {
           new User({name, email, password})
       }
    }

};

userCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

userCtrl.signin = (req, res) => {
    res.send('signin');
};

userCtrl.logout = (req, res) => {
    res.send('logout')
}

module.exports = userCtrl;