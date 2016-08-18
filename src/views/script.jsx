
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
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/test/',
            data: this.state.basic,
            success: function() {
                console.log('jq ajax success');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('jq ajax error');
                console.log(errorThrown);
            }
        });
        console.log(902);
        this.setState({clicked: true});

    },
    
    cancelClick: function() {
        this.setState({clicked: false});
    },

    render: function() {
        console.log('901. ' + this.state.basic.currency + ' ' + this.state.basic.amount);

        if (this.state.clicked == false) {
            return (
                <div className="col-sm-6 col-xs-12">
                    <form id="prerequisiteForm">
                        <label>Amount: 
                            {/* putting a step here does not help because form default is prevented */}
                            <input type="number" id="amount" onChange={this._onChange} value={this.state.amount} />
                        </label>
                        <label>Currency: 
                            <select id="currency" onChange={this._onChange} value={this.state.currency} >
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>
                        </label>
                        <label><input type="submit" value="Yes" onClick={this._onClick} /></label>

                        {/*
                        <label>
                            <input type="submit" value="Yes" onClick={function(){this._onClick; this.props._onClick; }.bind(this)}/>
                        </label>
                        */}

                        {/*<button onClick={function(){ this.foo1(); this.foo2(); }.bind(this)}> click me </button>*/}
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
            amount: 0,
            currency: "EUR"
        };
    },
    
    
    componentDidMount: function() {
//        var script = document.createElement("h2");
//        script.innerHTML = "good";
//        script.src = "https://use.typekit.net/foobar.js";
//        script.async = true;
//        document.getElementById('show').appendChild(script);
        
        console.log(905);
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
                        document.getElementById("show").innerHTML = localStorage.getItem("id");
                    }
                    else {
                        document.getElementById("show").innerHTML = "Sorry, your browser does not support Web Storage...";
                    }
                }
                console.log('id is ' + id);
//                myFunction2(id);
                
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
                <script>console.log(903);</script>
            </div>
        );
    }
});


var Input2 = React.createClass({
    getInitialState: function () {
        return {
            typed: ''
        };
    },
    onChange: function (event) {
        this.setState({
            typed: event.target.value
        });
    },
    render: function () {
        return (
            <div>
                <input type = "text" onChange = {this.onChange.bind(this)} /> You typed: 
                <code> {this.state.typed} </code> 
            </div>
        )
    }
});





var Payment = React.createClass({
    getInitialState: function() {
        return {
            flip_p: 1
        };
    },

    _onChangeFlip: function() {
        this.setState( {flip_p : 2} );
    },


  render: function () {
            console.log(this.state.flip_p);
      
      // 4
      if (this.state.flip_p == 1) {
          return (
              <div id = "payment" >
                  <h2> Play Nine </h2>
                  <hr/>
                  <div className = "clearfix" >
                      <div className="col-sm-3"></div>
                      <PrerequisitePanel _onClick = {this._onChangeFlip} />
                      <div className="col-sm-3"></div>

                      { /*<Input2 />
                      <p> {this.state.flip_p} </p> */}
                  </div>
              </div>
          );
      }
      
      // 3
      else {
          return ( 
              <div id = "payment">
                  <h2> Play Nine </h2>
                  <hr />
                  <div className = "clearfix">
                      <CheckoutPanel />
                      { /*<Input2 />
                      <p> {this.state.flip_p} </p> */}
                  </div>
              </div>
          );
      }
  }
});

React.render(
  <Payment />,
  document.getElementById('container1')
);
