// Imports
var models   = require('../models');

module.exports = {

   addV: function(req, res) {
   res.render('add_article')
   },

   addArticle: function(req, res) {

    const article = models.article.build({
        name: req.body.name,
        author: req.body.author,
        bio: req.body.bio
        
    })
        
        article.save().then(function(article) {
            req.name = article.name;
            req.author = article.author;
            req.bio = article.bio ;
            res.redirect('/list');
          
        })


    
    },
    

   list: function(req, res) { 
        models.article.findAll({
          attributes: ['name', 'author', 'bio']
      })
      .then(function(articles) {
          res.render('list', {
              articles: articles
          });
    });
    
  },

  
}  