 // Imports
var models   = require('../models');
const db     = require('../config/db')
var date = new Date;
date2 = date.toLocaleDateString();

module.exports = {

    addConsoV: function(req, res) {
          db.query('SELECT  consommations.id, famille, aliment, famille, aliment, consommations.nombre * aliments.calorie as calorie, consommations.createdat, type, nombre from aliments, consommations, users where aliments.id_aliment = consommations.idalim and users.id = consommations.idutil and consommations.createdat = "'+date2+'" and consommations.idutil = "'+req.user+'"', function(err, requests, fields) {
            if (err) throw err;
            db.query('SELECT SUM(total)as calorie FROM (SELECT (consommations.nombre * aliments.calorie) as total FROM aliments, consommations, users WHERE users.id = consommations.idutil AND aliments.id_aliment = consommations.idalim AND  consommations.idutil = "'+req.user+'" and consommations.createdat = "'+date2+'" ) src', function (err, totals, fields) {
              if (err) throw err;    
              res.render('add_conso', {
              requests: requests,
              totals:totals
              
            })
            })  
        })
    },

    search: function(req, res) {
            db.query('SELECT aliment from aliments where aliment like "%'+req.query.key+'%"', function(err, rows, fields) {
                  if (err) throw err;
                var data=[];
                for(i=0;i<rows.length;i++)
                  {
                    data.push(rows[i].aliment);
                  }
                  res.end(JSON.stringify(data));
                });
    },

    addConso: function(req, res) {
        
      var aliment = req.body.typeahead;
      var nombre = req.body.nombre;
      var type = req.body.type;

      req.checkBody('typeahead', "Le nom de l'aliment est requis").notEmpty();
      req.checkBody('nombre', 'Le nombre est requis').notEmpty();
      req.checkBody('nombre', 'La valeur du nombre est disproportionnée').len(1,2);
      req.checkBody('nombre', 'Le nombre doit etre compris entre 1 et 99').isInt({ min: 1, max: 99 });
      req.checkBody('type', 'Le type est requis').notEmpty();
      
      const errors = req.validationErrors();       // Liste des erreurs
        if (errors) {                                
            
            res.render('add_conso', {
                errors: errors
            });
        }
        else {

       models.aliments.findOne({
        attributes: ['id_aliment'],
        where: {aliment: aliment}
       
    })
    .then(function(aliments) {
        var id = aliments.id_aliment;
        models.consommations.create({
          idutil: req.user,
          idalim: id,
          nombre: nombre,
          type: type
        })
        .then(function(newConso) {
            res.redirect('addConso'); 
        })
        .catch(function(err) {
            return res.status(500).json('erreur', "Impossible d'ajouter la consommation");
        }) 

    })
    /*.catch(function(err) {
        return res.status(403).json('erreur', "Cet aliment n'est pas répertorié");
       });*/
      }
    },

    deleteConso: function(req, res) {
        console.log(req.params.id);
        db.query('DELETE from consommations where consommations.id = "'+req.params.id+'"', function(err, result, fields) {
            if (err) {
                console.log(err)
            }
            res.send('Success');
        })
    },

    listAlim: function(req, res) { 
        models.aliments.findAll({
            attributes: ['id_aliment', 'famille', 'aliment', 'calorie', 'proteine', 'glucide', 'lipide', 'quantite', 'unite']
        })
        .then(function(aliments) {
            res.render('list', {
                aliments: aliments
            });
      });
      
  },

    

}