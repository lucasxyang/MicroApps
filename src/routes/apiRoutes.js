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
  
    
    var prepareApi = require('../api/prepareApi')();
//    console.log(typeof prepareApi);
    
    // the following line runs prepareApi
    prepareApi.setup();
    
    apiRouter.route('/test')
        .get(prepareApi.sendInfo);
    
    

    return apiRouter;
};

module.exports = router;
