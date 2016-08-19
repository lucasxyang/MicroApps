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
    
    apiRouter.route('/test')
        .get(checkoutApi.displayInfo)
        .post(checkoutApi.acceptParams);
    
    apiRouter.get('/thank', function (req, res) {
//        res.json({ message: 'Hello World' });
//        res.render('thank.html');
        var thankYouHTML = '<html lang="en"><head><title>Thank you</title></head><body><h3>Thank you, your payment has been processed. </h3> <h4> Click <a href="" onClick="myFunc()"> here</a> to see status </h4> <script> function myFunc() { var id = localStorage.getItem("id"); var url = "https://test.oppwa.com/v1/checkouts/" + id + "/payment"; window.open(url); } </script></body></html>';
        res.send(thankYouHTML);
    });
    
    return apiRouter;
};

module.exports = router;
