/////////////////////////////////////////////////
// The application-wide Flux dispatcher.
// Based on Dispatcher provided by the flux pkg.
// This is the official Facebook implementation.
//
// Contains methods -- register() and dispatch()
// Details -- https://facebook.github.io/flux/docs/dispatcher.html
//
// @file:   MicroDispatcher.js
// @author: Xiaosiqi Yang
/////////////////////////////////////////////////

var Dispatcher = require('flux').Dispatcher;
var MicroDispatcher = new Dispatcher();

module.exports = MicroDispatcher;