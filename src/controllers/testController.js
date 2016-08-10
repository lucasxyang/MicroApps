// This is from official Payon website, https://docs.payon.com/tutorials/integration-guide
// Prepares the checkout

var http = require('https');
var querystring = require('querystring');

function request(callback) {
	var path='/v1/checkouts';
	var data = querystring.stringify( {
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
			jsonRes = JSON.parse(chunk);
//            console.log('b4 return');
			return callback(jsonRes);
		});
	});
//    console.log('here1');
	postRequest.write(data);
	postRequest.end();
//    console.log('here3');
}
	
// the param is an async callback
request( function(responseData) {
	console.log(responseData);
//    console.log('here5');
});