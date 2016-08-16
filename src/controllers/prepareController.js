// This is from official Payon website, https://docs.payon.com/tutorials/integration-guide
// Prepares the checkout

var LocalStorage = require('node-localstorage').LocalStorage;
var winston = require('winston');
var http = require('https');
var querystring = require('querystring');
//var app = express();
TEN = 10;

var prepareController = function () {

    var request = function (callback) {
        var path='/v1/checkouts';
        var data = querystring.stringify( {
            // the following three lines correspond to getStatus
            'authentication.userId' : '8a8294174b7ecb28014b9699220015cc',
            'authentication.password' : 'sy6KJsT8',
            'authentication.entityId' : '8a8294174b7ecb28014b9699220015ca',
            'amount' : '92.00',
            'currency' : 'EUR',
            'paymentType' : 'DB'
        });
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
    //            console.log('b4 return');
                return callback(jsonRes);
            });
        });
        postRequest.write(data);
        postRequest.end();
    };

    var giveInfo = function () {
        console.log(345);
        
//        app.get('/test', function(req, res, next) {
//            res.json({ message: 'Hello World' });
//        });
    };
    
    return {
        request: request,
        giveInfo: giveInfo
    };
    
    

};

module.exports = prepareController;
