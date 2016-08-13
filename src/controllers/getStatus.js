/*
https://test.oppwa.com/v1/checkouts/254257826F51439A7E86087EBB9F54F7.sbg-vm-tx01/payment
*/

var http = require('https');
var querystring = require('querystring');

function request(callback) {
	var path='/v1/checkouts/59FB413151984356AF33846FEFC50895.sbg-vm-tx02/payment';
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
			jsonRes = JSON.parse(chunk);
			return callback(jsonRes);
		});
	});
	postRequest.end();
}
	
request(function(responseData) {
	console.log(responseData);
});