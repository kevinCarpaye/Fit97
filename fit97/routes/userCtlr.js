// Imports
const models   = require('../models');
const bcrypt   = require('bcryptjs');
const passport = require('passport');
const db     = require('../config/db')


module.exports = {
   
    registerV: function(req, res) {
        res.render('register');
    },

    register: function(req, res, next) {
         // Place les entrées dans des variables
        var sex       = req.body.sex;
        var fname     = req.body.fname;
        var name      = req.body.name;
        var birthday  = req.body.birthday;
        var mobile    = req.body.mobile;
        var weight    = req.body.weight;
        var height    = req.body.height;
        var email     = req.body.email;
        var password  = req.body.password;
        var password2 = req.body.confirmpassword;
        var city      = req.body.city;
        var postcode  = req.body.postcode;
        var country   = req.body.country;
        var isAdmin   = req.body.isAdmin;

        //Vérifications des entrées côté serveur

        req.checkBody('sex', 'Le sexe est requis').notEmpty();
        req.checkBody('fname', 'Le prénom est requis').notEmpty();
        req.checkBody('fname', 'Vérifier le prénom').len(3,20);
        req.checkBody('name', 'Le nom est requis').notEmpty();
        req.checkBody('name', 'Vérifiez le nom').len(3,30);
        req.checkBody('birthday', 'La date de naissance est requise');
        req.checkBody('weight', 'Le poids est requis').notEmpty();
        req.checkBody('weight', 'Le poids doit être compris entre 10 et 500kg').isInt({ min: 10, max: 500});
        req.checkBody('height', 'La taille est requise').notEmpty();
        req.checkBody('height', 'La taille doit être comprise entre 100 et 260cm').isInt({ min: 100, max: 260});
        req.checkBody('email', "l'email est requis").notEmpty();
        req.checkBody('email', "L'email est invalide").isEmail();
        req.checkBody('password', 'Le mot de passe est requis').notEmpty();
        req.checkBody('password', 'Le mot de passe doit contenir au moins 8 caractères').len(8,100);
        //req.checkBody('password', 'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial').matches
        req.checkBody('confirmpassword', 'Les mots de passes doivent être identiques').equals(req.body.password);
        req.checkBody('city', 'La ville est requise').notEmpty();
        req.checkBody('city', 'Ville incorrecte').len(3,50);
        req.checkBody('postcode', 'Le code postal est requis').notEmpty();
        req.checkBody('postcode', 'Le code postal est incorrect').len(5);
        req.checkBody('country', 'Le pays est requis').notEmpty();
        req.checkBody('country', 'Le pays est incorrect').len(3,50);
        req.checkBody('cdu', "Vous devez accepter les conditions générales d'utilisation pour continuer");

        const errors = req.validationErrors();       // Liste des erreurs
        if (errors) {                                
            
            res.render('register', {
                errors: errors
            });
        }

        else {
                 
        models.users.findOne({        // Vérification avant création
            attributes: ['email'],
            where: { email : email }
        })
        .then(function(userFound)  {     // Si l'email n'existe pas, création du compte
          if (!userFound) {   
              bcrypt.hash(password, 10,function(err, bcrypted) {
                  if (err) throw error;
                  var newUser = models.users.create({
                      sex:      sex,
                      fname:    fname,
                      name:     name,
                      birthday: birthday,
                      mobile:   mobile,
                      weight:   weight,
                      height:   height,
                      email:    email,
                      password: bcrypted,
                      city:     city,
                      postcode: postcode,
                      country:   country,
                      isAdmin:  false
                  })
                  .then(function(newUser) {
                      req.flash('success', "Votre compte à bien été crée, connectez vous pour poursuivre");
                      res.redirect('login')           
                  })
                  .catch(function(err) {
                      return res.status(500).json({'erreur': "Impossible de créer le compte"})
                  })
              })
          }
          else {
                req.flash('warning', 'Email déja utilisé')
                res.redirect('/register');
          }
        })
      }
      passport.serializeUser(function(id, done) {
          done(null, id);
      })
      
      passport.deserializeUser(function(id, done) {
          done(null, id)
      })
    },

    loginV: function(req, res) {
       res.render('login');
    },
    
    login: function(req, res, next) {
            passport.authenticate('local', function(err, user, info) {
              if (err) { 
                  return next(err); 
                }
              if (!user) { 
                  req.flash('danger', "Vérifiez vos identifiants");
                  return res.redirect('/login')
              }
              req.logIn(user, function(err) {
                if (err) { return next(err); 
                }
                return res.redirect('/dashboard');
              });
            })(req, res, next);
    },

    logoutV: function(req, res) {
            req.logout();
            req.session.destroy()
            res.redirect('/')
        
        
    },

    getProfil: function (req, res) {
        models.users.findOne({
            attributes: ['id','fname', 'name', 'birthday', 'mobile', 'weight', 'height', 'email', 'city', 'postcode', 'country'],
            where: {id: req.user}
        })
        .then(function(results) {
            res.render('user_profil', {
                results: results
            });
        })
    },

    setProfil: function(req, res) {
        var sex = req.body.sex;
        var fname = req.body.fname;
        var name = req.body.name;
        var birthday = req.body.birthday;
        var mobile = req.body.mobile;
        var weight = req.body.weight;
        var height = req.body.height;
        var email = req.body.email;
        var city = req.body.city;
        var postcode = req.body.postcode;
        var country =req.body.country;

        req.checkBody('sex', 'Le sexe est requis').notEmpty();
        req.checkBody('fname', 'Le prénom est requis').notEmpty();
        req.checkBody('fname', 'Vérifier le prénom').len(3,20);
        req.checkBody('name', 'Le nom est requis').notEmpty();
        req.checkBody('name', 'Vérifiez le nom').len(3,30);
        req.checkBody('birthday', 'La date de naissance est requise');
        req.checkBody('weight', 'Le poids est requis').notEmpty();
        req.checkBody('weight', 'Le poids doit être compris entre 10 et 500kg').isInt({ min: 10, max: 500});
        req.checkBody('height', 'La taille est requise').notEmpty();
        req.checkBody('height', 'La taille doit être comprise entre 100 et 260cm').isInt({ min: 100, max: 230});
        req.checkBody('email', "l'email est requis").notEmpty();
        req.checkBody('email', "L'email est invalide").isEmail();
        req.checkBody('city', 'La ville est requise').notEmpty();
        req.checkBody('city', 'Ville incorrecte').len(3,50);
        req.checkBody('postcode', 'Le code postal est requis').notEmpty();
        req.checkBody('postcode', 'Le code postal est incorrect').len(5);
        req.checkBody('country', 'Le pays est requis').notEmpty();
        req.checkBody('country', 'Le pays est incorrect').len(3,50);

        const errors = req.validationErrors();       // Liste des erreurs
        if (errors) {                                
            res.render('user_profil', {
                errors: errors
            });
        }

        else {
            
            models.users.findOne({
                attributes: ['sex','fname','name','birthday', 'mobile', 'weight', 'height', 'email', 'city', 'postcode', 'country'],
                where: {id: req.user}
            })
            .then(function(userFound) {
                console.log(userFound)
                if(userFound) {
                    db.query('UPDATE users SET sex = "'+sex+'", fname = "'+fname+'", name = "'+name+'", birthday = "'+birthday+'", mobile = "'+mobile+'", weight = "'+weight+'", height = "'+height+'", email = "'+email+'", city = "'+city+'", postcode = "'+postcode+'", country = "'+country+'" where users.id = "'+req.user+'"', function(err, results, fields) {
                    if (err) throw err;
                    console.log(results);
                    res.redirect('/profil') 
                    });  
                }
                else {
                    return res.status(500).json({'Erreur': "Le profil n'a pas été modifié"});
                }
            })
            .catch(function(err) {
                return res.status(404).json({'Erreur': "L'utilisateur n'a pas été trouvé"});
            })    
        }

    },

    modifV: function(req, res) {
        res.render('modif_pass')
    },

    modif: function(req, res) {
        var password = req.body.password
        var passworsd2 = req.body.confirmpassword

        req.checkBody('password', 'Le nouveau mot de passe est requis').notEmpty();
        req.checkBody('password', 'Le mot de passe doit contenir au moins 8 caractères').len(8,100);
        //req.checkBody('password', 'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial').matches
        req.checkBody('confirmpassword', 'Les mots de passes doivent être identiques').equals(req.body.password);

        
        const errors = req.validationErrors();       // Liste des erreurs
        if (errors) {                                
            
            res.render('modif_pass', {
                errors: errors
            });
        }

        else {
            models.users.findOne({
                attributes: ['password'],
                where: {id: req.user}
            })
            .then(function(compare) {
                bcrypt.compare(password, compare.password, function(error, success){
                    if (error) throw error;
                    if (success) {
                        return res.status(404).json({'erreur': "Le nouveau mot de passe doit être différent de l'ancien"})
                    }
                   if (!success) {
                       bcrypt.hash(password, 10,function(err, bcrypted) {
                       if (err) throw err;
                       db.query('UPDATE users SET password = "'+bcrypted+'" where users.id = "'+req.user+'"', function(err, results, fields) {
                           if (err) throw err;
                           console.log(bcrypted);
                           res.redirect('/profil') 
                       });
                     })
                       
                    }
                })
            
            })
        }
    }
}

