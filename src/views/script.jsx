/////////////////////////////////////////////////
// React components.
//
// @file:   script.jsx
// @author: Xiaosiqi Yang
/////////////////////////////////////////////////

var PrerequisitePanel = React.createClass({
    
    getInitialState: function () {
        return {
            clicked: false,
            basic: {
                amount: 0,
                currency: "EUR"
            }
        };
    },
    
    _onChange: function(event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.basic[field] = value;
        this.setState({
            basic: this.state.basic
        });
    },
    
    
    _onClick: function(event) {
        // 1 validate input
        // 2 submit the basic parameter to checkoutController (, via checkoutApi)
        // 3 hide this current prerequisite form
        // 4 un-hide the checkout form
        
        // 2
//        console.log(event);
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/test/',
            data: this.state.basic,
            success: function() {
//                console.log('jq ajax success');
            },
            error: function(jqXHR, textStatus, errorThrown) {
//                console.log('jq ajax error');
                console.log(errorThrown);
            }
        });
//        console.log(902);
        this.setState({clicked: true});

    },
    
    cancelClick: function() {
        this.setState({clicked: false});
    },

    /*
    componentDidMount: function () {
        var thisprerequisiteForm = this;

        // NOTE: to get bootstrap validator working, this jQuery statement to attach .on('submit',...)
        // must come after the the validations are enabled on the form (down in its children)
        // Therefore it is placed here inside componentDidMount so that the form is rendered first.
        $('#prerequisiteForm').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
                console.log('is prevented');
                // Handle the invalid form
            } else {
                // Proceed with form submission if all input data is valid
                thisprerequisiteForm._onClick(e);
            }
        });
    },
    */
    
    render: function() {
//        console.log('901. ' + this.state.basic.currency + ' ' + this.state.basic.amount + this.state.clicked);

        // 1
        if (this.state.clicked == false) {
            return (
                <div className="col-sm-6 col-xs-12">
                    <form id="prerequisiteForm" onSubmit={this._onClick} data-toggle="validator">
                        <div className="row">
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="amount">Amount:</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-money" aria-hidden="true"></i>
                                        </div>

                                        {/* putting a step here does not help because form default is prevented */}
                                        <input type="number" id="amount" 
                                            className="form-control" 
                                            min="0.01" max="100" step="0.01"
                                            pattern="[0-9]+(\.[0-9][0-9]?)?" 
                                            data-error="Only positive number with max 2 decimal places" 
                                            onChange={this._onChange} 
                                            value={this.state.basic.amount} 
                                            required />

                                    </div>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                            
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="currency">Currency: </label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-eur" aria-hidden="true"></i>
                                        </div>
                                        <select id="currency" className="form-control" onChange={this._onChange} value={this.state.basic.currency} >
                                            <option value="EUR">EUR</option>
                                            <option value="USD">USD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                        
                    </form>
                </div>
            );
        }
        
        else {
            return (
                <div className="col-sm-6 col-xs-12">
                    <p> Do you want to donate {this.state.basic.currency} {this.state.basic.amount} ? </p>
                    <button onClick={this.props._onClick} >Confirm</button>
                    <button onClick={this.cancelClick} >Cancel</button>
                </div>
            );
        }
    }
});



var CheckoutPanel = React.createClass({
    getInitialState: function () {
        return {
        };
    },
    
    
    componentDidMount: function() {
        
//        console.log(905);
        localStorage.clear();
        $.ajax({
            url: '/api/test',
            complete: function (data) {
                
                // get response text
                var rt = data.responseText;
                // eliminate backslash (escapes from quote marks). b is a string
                var no_bs = JSON.parse(rt);
                // parse string to JSON object
                var jo = JSON.parse(no_bs);
                
                if(jo === null)
                    console.log('nothing');
                else {
                    var result = jo.result;
                    var buildNumber = jo.buildNumber;
                    var timestamp = jo.timestamp;
                    var ndc = jo.ndc;
                    var id = jo.id;

                    if (typeof (Storage) !== "undefined") {
                        // store
                        localStorage.setItem("result_code", result.code);
                        localStorage.setItem("result_description", result.description);
                        localStorage.setItem("buildNumber", buildNumber);
                        localStorage.setItem("timestamp", timestamp);
                        localStorage.setItem("ndc", ndc);
                        localStorage.setItem("id", id);
                        // show only id
//                        document.getElementById("show").innerHTML = localStorage.getItem("id");
                    }
                    else {
                        document.getElementById("show").innerHTML = "Sorry, your browser does not support Web Storage...";
                    }
                }
                console.log('id is ' + id);
                
                var loc1 = 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=' + id;
                var tag = document.createElement("script");
                tag.type = 'text/javascript';
                tag.async = true;
                tag.src = loc1;
                document.getElementById('show').appendChild(tag); //can be append to any object other than body
            }
            
        });
    },
    
    
    render: function() {
        
        /*
        
        <div>
            <form action="https://docs.payon.com/tutorials/integration-guide/customisation/" className="paymentWidgets">VISA MASTER AMEX DISCOVER</form>
        </div>
    
        */
        
        return (
            <div>
                <form id="checkoutForm" action="http://localhost:5000/api/thank" className="paymentWidgets">VISA MASTER AMEX DISCOVER
                </form>
            </div>
        );
    }
});


var Payment = React.createClass({
    getInitialState: function () {
        return {
            readyToCheckout: false
        };
    },
    
    _onChangeFlip: function () {
        this.setState({
            readyToCheckout: true
        });
    },
    
    render: function () {
        console.log(this.state.readyToCheckout);
        // 4
        if (this.state.readyToCheckout == false) {
            return (
                <div id = "payment">
                    <h2> Best Payment Solution </h2>
                    <hr/>
                    <div className = "clearfix">
                        <div className = "row">
                        <div className = "col-sm-3 col-xs-12"> </div>
                        <PrerequisitePanel _onClick = {this._onChangeFlip} />
                        <div className = "col-sm-3 col-xs-12"> </div>
                        </div>
                    </div>
                </div>
            );
        }
        // 3
        else {
            return (
                <div id = "payment">
                    <h2> Best Payment Solution </h2>
                    <hr/>
                    <div className = "clearfix">
                        <CheckoutPanel />
                    </div>
                </div>
            );
        }
    }
});

React.render( <Payment /> , document.getElementById('container1'));