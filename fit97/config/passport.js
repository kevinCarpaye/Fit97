const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const models   = require('../models');
const bcrypt   = require('bcryptjs');

module.exports = function(passport) {

    passport.use('local',new LocalStrategy( {
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    },
       function(req, email, password, done) {

         
           models.users.findOne({
               where: {email: email}
           })
           .then(function(userFound) {
               if (userFound) {
                   bcrypt.compare(password, userFound.password, function(error, success){
                       if (error) throw error;
                    //console.log(userFound.id);
                    //console.log(userFound.password);
                      if(success) {
                          return done(null, userFound.id);
                      }
                      else { 
                         return done (null, false, {message: "Le mot de passe est invalide"})
                      }
                   })
               }
               else  {
                   return done(null, false, {message: "L'email ne correspond à aucun compte"})
                };
               }
           )
       }  
    ))
 
    passport.serializeUser(function(userFound, done){
        done(null, userFound);
    });

    passport.deserializeUser(function(userFound, done) {
       done(null, userFound);
    });
 
    
}