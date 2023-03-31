module.exports.home = function (req, res){
//     if(req.isAuthenticated()){
//         return res.redirect('/');
//    }
    
    return res.render('home', {
        title: "Home"
    })
}