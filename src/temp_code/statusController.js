/*
https://test.oppwa.com/v1/checkouts/254257826F51439A7E86087EBB9F54F7.sbg-vm-tx01/payment
*/

var http = require('https');
var querystring = require('querystring');
var LocalStorage = require('node-localstorage').LocalStorage;
var json1 = require('../../scratch/myStorage1.json');

var statusController = function () {
    
    var request = function (callback) {
    //    console.log(typeof json1);
    //    console.log('<<<' + json1 + '>>>');
        var id = json1.id;

        var path='/v1/checkouts/' + id + '/payment';
        // the following three lines correspond to prepare
        path += '?authentication.userId=8a8294174b7ecb28014b9699220015cc'
        path += '&authentication.password=sy6KJsT8'
        path += '&authentication.entityId=8a8294174b7ecb28014b9699220015ca'
        var options = {
            port: 443,
            host: 'test.oppwa.com',
            path: path,
            method: 'GET',
        };
        var postRequest = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                // need write-protection here
                localStorage = new LocalStorage('./scratch');
                localStorage.setItem('myStorage2.json', chunk);

                jsonRes = JSON.parse(chunk);
                return callback(jsonRes);
            });
        });
        postRequest.end();
    };
    
    return {
        request: request
    };
};

module.exports = statusController;