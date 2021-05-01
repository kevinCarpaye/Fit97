
module.exports = function authentificationMiddleware(req, res, next) {
   // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
   // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    } 
    else {
        return res.redirect("/login");
    }
    
}