var LocalStorage = require('node-localstorage').LocalStorage;
var express = require('express');
var app = express();



var checkoutApi = function () {

    // Get a reference to controller layer module
    var checkoutController = require('../controllers/checkoutController')();

    
    // this sets up/prepares the checkout
    var setup = function () {
//        console.log('set up checkout successfully');
        checkoutController.request( function(responseData) {
            console.log(responseData);
        });
    };
    
    // this displays checkout info to front end
    // used in apiRoutes
    var displayInfo = function (req, res) {

        var localStorage = new LocalStorage('./scratch');
        // need try-catch-ish handling
        var item = null;
        if( localStorage.getItem('myStorage1.json') ) {
            item = localStorage.getItem('myStorage1.json');
        }
        
        res.json(item);
        
    };
    
    // accept basic params, and send to controller
    var acceptParams = function(req, res) {
        var amount = req.body.amount;
        var currency = req.body.currency;
                
//        console.log(amount + ' ' + currency + ' in acceptParams');
        checkoutController.setAmount(amount);
        checkoutController.setCurrency(currency);
        setup();
    };
    
    return {
        acceptParams: acceptParams,
        setup: setup,
        displayInfo: displayInfo
    };
};

module.exports = checkoutApi;