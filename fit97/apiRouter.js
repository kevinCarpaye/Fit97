// Imports
var express  = require('express');
var userCtlr = require('./routes/userCtlr');
var activityCtlr = require('./routes/activityCtlr');
var articleCtlr = require('./routes/articleCtlr');
var dashboardCtlr =require('./routes/dashboardCtlr');
var foodCtlr   = require('./routes/foodCtlr');
const auth     = require('./config/authentification_middleware');


//Router
exports.router = (function() {
    var apiRouter = express.Router();
 
// Users routes

apiRouter.route('/register').get(userCtlr.registerV);
apiRouter.route('/register').post(userCtlr.register);
apiRouter.route('/login').get(userCtlr.loginV);
apiRouter.route('/login').post(userCtlr.login);
apiRouter.route('/logout').get(auth, userCtlr.logoutV);
apiRouter.route('/profil/').get(auth, userCtlr.getProfil);
apiRouter.route('/profil').post(auth, userCtlr.setProfil)

apiRouter.route('/profil_pass').get(auth, userCtlr.modifV)
apiRouter.route('/profil_pass').post(auth, userCtlr.modif)

apiRouter.route('/dashboard').get(auth, dashboardCtlr.dashboardV);

apiRouter.route('/addConso').get(auth, foodCtlr.addConsoV);
apiRouter.route('/search').get(foodCtlr.search);
apiRouter.route('/addConso').post(auth, foodCtlr.addConso);
apiRouter.route('/deleteConso:id').delete(foodCtlr.deleteConso)

apiRouter.route('/addActivity').get(auth, activityCtlr.addActivityV);
apiRouter.route('/search2').get(activityCtlr.search2);
apiRouter.route('/addActivity').post(auth, activityCtlr.addActivity);
apiRouter.route('/deleteActivity:id').delete(activityCtlr.deleteActivity);

apiRouter.route('/listAlim').get(auth, foodCtlr.listAlim);
apiRouter.route('/listArticle').get(articleCtlr.list);

    return apiRouter;
})();