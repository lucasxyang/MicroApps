var LocalStorage = require('node-localstorage').LocalStorage;
var express = require('express');
var app = express();

var prepareApi = function () {

    // Get a reference to data layer module
    var prepareController = require('../controllers/prepareController')();
    
    // this sets up/prepares the checkout
    var setup = function () {
//        console.log('set up checkout successfully');
        prepareController.request( function(responseData) {
            console.log(responseData);
            if (typeof localStorage === "undefined" || localStorage === null) {
                localStorage = new LocalStorage('./scratch');
            }
        });
    };
    
    // this sends checkout info to front end
    var sendInfo = function (req, res) {
//        console.log(req);
//        console.log(res);
//        console.log(234);
        
        var localStorage = new LocalStorage('./scratch');
        var item = localStorage.getItem('myStorage1.json');
        
        prepareController.giveInfo();
        
//        app.get('/api/test', function(req, res, next) {
//        res.json({ message: 'Hello World' });
//        });
        res.json(item);
        
    };
    
    
    return {
        setup: setup,
        sendInfo: sendInfo
    };
};

module.exports = prepareApi;