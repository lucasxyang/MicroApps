
var statusApi = function () {
    
    var statusController = require('../controllers/statusController')();
    
    var checkStatus = function () {
        statusController.request(function(responseData) {
            console.log(responseData);
        });
    };
    
    return {
        checkStatus: checkStatus
    };
};

module.exports = statusApi;