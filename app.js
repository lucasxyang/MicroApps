/////////////////////////////////////////////////
// The main file. The starting point.
// The heart of our app.
//
// @file:   app.js
// @author: Xiaosiqi Yang
/////////////////////////////////////////////////

var express = require('express');
var pkgJson = require('./package.json');
var bodyParser = require('body-parser');
require('./src/common/logging')();

// Initialize the app object based on express framework 
//
var app = express();


// Configure the application server
//
// Basic configuration
var appName = pkgJson.name; // DO NOT hard-code app name here
var PORT = process.env.PORT || 5000;

// Set static folders
app.use(express.static('public'));
app.use(express.static('src/views'));

//app.set('view engine', 'ejs');

// Enable reading POST data in URL-encoded and JSON formats
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes configuration
var apiRouter = require('./src/routes/apiRoutes')();
app.use('/api', apiRouter);
// TODO: HTTP Error handling

//app.get('/', function(req, res) {
//    res.json({ message: 'Hello World' });
//});


//var prepareController = require('./src/controllers/prepareController.js');

// Start the application server
//
app.listen(PORT, function(err) {
    // Show a confirmation message when the server starts
    console.log('Running ' + appName + ' on port ' + PORT);
});
