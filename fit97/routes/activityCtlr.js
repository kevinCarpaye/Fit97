const models = require('../models');
const db     = require('../config/db');
var date = new Date;
date2 = date.toLocaleDateString();

module.exports = {

    addActivityV: function(req, res) {
        db.query('SELECT activities.id, sports.name, sports.MET, activities.time, ROUND(((sports.MET * 3.5 * users.weight)/200)*50)as calorie from sports, activities, users where users.id = activities.idutil and sports.id = activities.idSport and users.id = "'+req.user+'" and activities.createdat = "'+date2+'"', function(err, requests, fields) {
            if (err) throw err; 
            db.query('SELECT SUM(calorie) as calorie FROM (SELECT ROUND(((sports.MET * 3.5 * users.weight)/200)*50)as calorie from sports, activities, users where sports.id = activities.idSport and users.id = activities.idutil and users.id = "'+req.user+'" and activities.createdat = "'+date2+'") src', function(err, totals, fields) {
                if (err) throw err
                res.render('add_activity', {
                requests: requests,
                totals: totals
               });
            })
         })
    },

    search2: function(req, res) {
        db.query('SELECT name from sports where name like "%'+req.query.key+'%"', function(err, rows, fields) {
              if (err) throw err;
            var data=[];
            for(i=0;i<rows.length;i++)
              {
                data.push(rows[i].name);
              }
              res.end(JSON.stringify(data));
            });
},

    addActivity: function(req, res) {

        sport = req.body.typeahead;
        time  = req.body.time;

        req.checkBody('typeahead', 'Le sport est requis').notEmpty();
        req.checkBody('time', 'La durée est requise').notEmpty();
        req.checkBody('time', "La durée n'est pas valide").isInt({min: 1, max: 500});

        const errors = req.validationErrors();       // Liste des erreurs
        if (errors) {                                
            
            res.render('add_activity', {
                errors: errors
            });
        }

        else {
            
            db.query('SELECT id from sports where name = "'+sport+'"', function(err, sport) {
                if (err) throw err;
                var id = sport[0].id;
                models.activity.create({
                  idSport: id,
                  time: time,
                  idutil: req.user
                })
                .then(function(newActiv) {
                    res.redirect('/addActivity');
                })
                .catch(function(err) {
                    return res.status(500).json('erreur', "Impossible d'ajouter cette activité");
                })
            })    
            
        }
    },

    deleteActivity: function(req, res) {
        console.log(req.params.id);
        db.query('DELETE from activities where activities.id = "'+req.params.id+'"', function(err, result, fields) {
            if (err) {
                console.log(err)
            }
            res.send('Success');
        })
    }
}