/////////////////////////////////////////////////
// Routes for the API layer.
//
// @file:   apiRoutes.js
// @author: Xiaosiqi Yang
/////////////////////////////////////////////////

var express = require('express');
var apiRouter = express.Router();
var app = express();

var router = function (knex) {
  
    
    var checkoutApi = require('../api/checkoutApi')();
    
    // the following line runs checkoutApi
// if node-localstorage has no content, enable this line to start the appl
//    checkoutApi.setup();
    
    apiRouter.route('/test')
        .get(checkoutApi.displayInfo);
    apiRouter.route('/test')
        .post(checkoutApi.acceptParams);
    
    
    apiRouter.get('/thank', function(req, res) {
        res.json({ message: 'Hello World' });
    });

    return apiRouter;
};

module.exports = router;
