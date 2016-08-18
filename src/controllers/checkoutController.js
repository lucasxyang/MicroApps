// This is from official Payon website, https://docs.payon.com/tutorials/integration-guide
// Prepares the checkout

var LocalStorage = require('node-localstorage').LocalStorage;
var winston = require('winston');
var http = require('https');
var querystring = require('querystring');
var validation = require('../common/validation')();


var checkoutController = function () {

    var validateAmount = function(amount) {
        var amount = validation.sanitizeInput(amount);
        var validationResult = validation.validateFloat(amount, true, 'amount');
        if (amount && !validationResult) {
            amount = validation.convertToFloat(amount);
        }
        return validationResult;
    };
    
    
    var fillDecimalZero = function(newFloat) {
        var res = newFloat.split('.');
//        console.log(res);
        if(res.length > 1) {
            if(res[1].length >= 2) {
                res[1] = res[1].substring(0, 2);
            } else if (res[1].length == 1) {
                res[1] = res[1] + '0';
            } else {
                res[1] = '00';
            }
            newFloat = res[0].concat('.').concat(res[1]);
        }
        return newFloat;
    };

    var amount = 0;
    var currency = '';
    
    var setAmount = function(newAmount) {
        var tempAmount = fillDecimalZero(newAmount);
        var tempError = validateAmount(tempAmount);
        if(tempError == '' || tempError == null) {
            amount = tempAmount;
        }
    };
    
    var setCurrency = function(newCurrency) {
        currency = newCurrency;
    };
    
    
    var request = function (callback) {
        var path='/v1/checkouts';
        var data = querystring.stringify( {
            // the following three lines correspond to getStatus
            'authentication.userId' : '8a8294174b7ecb28014b9699220015cc',
            'authentication.password' : 'sy6KJsT8',
            'authentication.entityId' : '8a8294174b7ecb28014b9699220015ca',
            'amount' : amount,
            'currency' : currency,
            'paymentType' : 'DB'
        });
        
        console.log(data);
        
        var options = {
            port: 443,
            host: 'test.oppwa.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        };
        var postRequest = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                localStorage = new LocalStorage('./scratch');
                localStorage.setItem('myStorage1.json', chunk);


                jsonRes = JSON.parse(chunk);
                return callback(jsonRes);
            });
        });
        postRequest.write(data);
        postRequest.end();
    };

    
    return {
        setAmount: setAmount,
        setCurrency: setCurrency,
        request: request
    };

};

module.exports = checkoutController;
