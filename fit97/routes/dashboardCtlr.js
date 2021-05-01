const models   = require('../models');
const db       = require('../config/db');


module.exports = {

    dashboardV: function(req, res) {
        
            db.query('SELECT SUM(total)as calorie FROM (SELECT (consommations.nombre * aliments.calorie) as total FROM aliments, consommations, users WHERE users.id = consommations.idutil AND aliments.id_aliment = consommations.idalim AND  consommations.idutil = "'+req.user+'" and consommations.createdat = "'+date2+'" ) src', function (err, requests, fields) {
                if (err) throw err;  
                db.query('SELECT SUM(calorie) as calorie FROM (SELECT ROUND(((sports.MET * 3.5 * users.weight)/200)*50)as calorie from sports, activities, users where sports.id = activities.idSport and users.id = activities.idutil and users.id = "'+req.user+'" and activities.createdat = "'+date2+'") src', function(err, totals, fields) {
                    if (err) throw err 
                    db.query('SELECT fname from users where id = "'+req.session.passport.user+'"', function(err, founds, fields) {
                        res.render('dashboard', {
                            totals: totals[0].calorie,
                            requests: requests[0].calorie,
                            founds: founds[0].fname
                        })
                    }) 
                    
            })
        })    
    }   

}