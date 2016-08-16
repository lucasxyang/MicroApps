/////////////////////////////////////////////////
// Store for managing Leads module page events.
//
// @file:   LeadsStore.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var EventEmitter = require('events').EventEmitter;
var MicroDispatcher = require('../dispatcher/MicroDispatcher');
var PaymentConstants = require('../PaymentConstants');
var $ = require('jquery');
var Cookies = require('js-cookie');

// DATA
//-----------------------------------------------
var leadsOwned = [];
var addedLeadId = ''; 
// ajax call does not return anything essential. (Actually it returns a jqXHR object, which is a superset of the XMLHTTPRequest object)
// I must put the useful value in a variable, then retrieve that variable later. 
// Another workaround is to use callback, or promises, to force execution async-ly after obtaining jqXHR object. 
var foundLead = {};


// STORE as EVENT EMITTER
//-----------------------------------------------
var LeadsStore = new EventEmitter();

// CUSTOM METHODS
//-----------------------------------------------
LeadsStore.addGetDataListener = function (listener) {
    // see https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    this.on('getData', listener);
};
LeadsStore.emitGetData = function() {
    // see https://nodejs.org/api/events.html#events_emitter_emit_eventname_arg1_arg2
    // Synchronously calls each of the listeners registered for the Event Named 'getData'
    // In previous function addGetDataListener is where listeners such as 
    // MyLeadsPage._onGetByOwner registered to get emits from this Store
    this.emit('getData');
};
// Currently three methods are listening to this one event: get by owner, find by id, display lead detail. 
// All can use one addGetDataListener without worrying about more than one view(page) receive the 'getData' event message, 
// because at any time there is only one page listening to the event (others are either not listening at all or having their listeners removed)


LeadsStore.addedLeadListener = function (listener) {
    // .on method, firstArg: eventName, secondArg: listener, both req
    this.on('addedLead', listener);
};

LeadsStore.emitAddedLead = function (listener) {
    // .emit method, firstArg: eventName [req], 
    // consequent args: listeners [opt]
    // Synchronously calls each of the listeners registered for the Event Named 'addedLead'.
    // Returns true if the event had listeners, false otherwise.
    this.emit('addedLead');
};



// BUSINESS LOGIC
//-----------------------------------------------
// Next two functions are called by MyLeadsPage
LeadsStore.getLeadsByOwner = function() {
    var thisLeadsStore = this;
    
    // jQuery version of ajax
    $.ajax({
        type: 'GET',
        url: '/api/leads/',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(leads) {
            leadsOwned = leads;
            thisLeadsStore.emitGetData();
        }
    });
    
    
    // Native version 1 of ajax
    /*
    var xhr = new XMLHttpRequest(); //readyState is 0

    xhr.open('GET', '/api/leads/');
    xhr.setRequestHeader('x-access-token', Cookies.get('titanAuthToken'));
    xhr.responseType = 'json'; // readyState is 1

    xhr.onreadystatechange = function () {
//        readyState is changed to 2, 3, 4 in order
        if (xhr.readyState == 4 && xhr.status == 200) {
            leadsOwned = xhr.response; // It was set 'JSON' before
            thisLeadsStore.emitGetData();
        }
    };
    xhr.send();
    */
    
    
    // Native version 2 of ajax
    /*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/leads/');
    xhr.setRequestHeader('x-access-token', Cookies.get('titanAuthToken'));

    xhr.onreadystatechange = function () {
//        if (xhr.readyState !=4 || xhr.status != 200){
//            console.log("Not in DONE state");
//        }
//        console.log(xhr.readyState + ' ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            leadsOwned = JSON.parse(xhr.response); //responseType is '', which is default to DOMString.
            thisLeadsStore.emitGetData();
        }
    };
    xhr.send();
    */
    
    
    // Shorthand version of jQuery ajax
    /*
    $.ajaxSetup({
        headers: { 'x-access-token': Cookies.get('titanAuthToken') }
    });
    $.get('/api/leads/', function(leads) {
        leadsOwned = leads;
        thisLeadsStore.emitGetData();
    });
    */
    
};
LeadsStore.getLeadsOwned = function() {
    return leadsOwned;
};


// Next two functions are called by CreateLeadPage
LeadsStore.addLead = function(lead) {
    var thisLeadsStore = this;
    $.ajax({
        type: 'POST',
        url: '/api/leads/',
        headers: {  'x-access-token': Cookies.get('titanAuthToken') },
        data: lead, // Data to be sent to the server. See http://api.jquery.com/jquery.ajax/
        success: function(partyId) {
            addedLeadId = partyId;
            // emit seems to be async as well
            thisLeadsStore.emitAddedLead();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};
LeadsStore.getAddedLead = function() {
    return addedLeadId;
};


// Next two functions are called by FindLeadsPage
LeadsStore.findLeadById = function(passedId) {
    var thisLeadsStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/leads/' + passedId,
        headers: {  'x-access-token': Cookies.get('titanAuthToken') },
        data: passedId,
        success: function(lead) {
            foundLead = lead;
            thisLeadsStore.emitGetData();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            foundLead = '';
            thisLeadsStore.emitGetData();
            console.log('An error happened... ');
            if(jqXHR.hasOwnProperty('status') && jqXHR.status === 200) {
                console.log('Error is 200. No such lead');
                return;
            }
            console.log(errorThrown);
        }
    });
};
LeadsStore.getLeadFound = function() {
    // foundLead is the found_lead_id when success, or empty object when error
    return foundLead;
};



// LINK BETWEEN DISPATCHER AND STORE
//-----------------------------------------------
TitanDispatcher.register(function(action) {
    switch(action.actionType) {
        case LeadsConstants.GET_MY_PAYMENT: {
            LeadsStore.getLeadsByOwner();
            break;
        }
    }
});

module.exports = LeadsStore;