const User = require('../models/user');

module.exports.profile = function(req, res){
    res.render('user_profile', {
        title: "User"
    });
}
// render the Sign Up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
         return res.redirect('/users/profile');
    }

    res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}
// render the Sign In page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if (err){console.log('error in finding user in signing up'); return}


        if(!user){
            User.create(req.body, function(err, user){
                if (err){console.log('error in signing up the user'); return}

                return res.redirect('/users/sign-in');
                
            })

            
        }else{
            return res.redirect('back');
        }
    });
}



// get the Sign in data and create session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
      });
}