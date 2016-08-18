var PrerequisitePanel = React.createClass({
    
    getInitialState: function () {
        return {
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
    },

    
    render: function() {
        console.log('901. ' + this.state.basic.currency + ' ' + this.state.basic.amount);

        return (
            <form id="prerequisiteForm">
                <label>Amount: 
                    <input type="text" id="amount" onChange={this._onChange} value={this.state.amount} />
                </label>
                <label>Currency: 
                    <select id="currency" onChange={this._onChange} value={this.state.currency} >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                </label>
                <label><input type="submit" value="Yes" onClick={this._onClick} /></label>
            </form>
        );
    }
});



var CheckoutPanel = React.createClass({
    getInitialState: function () {
        return {
            amount: 0,
            currency: "EUR"
        };
    },
    
    
    render: function() {

//    var wpwlOptions = {
//        style: "card",
//        onReady: function() {
//            var numberOfInstallmentsHtml = '<div class="wpwl-label wpwl-label-custom" style="display:inline-block">Number of Installments</div>' +
//              '<div class="wpwl-wrapper wpwl-wrapper-custom" style="display:inline-block">' +
//              '<select name="recurring.numberOfInstallments"><option value="1">1</option><option value="3">3</option><option value="5">5</option></select>' +
//              '</div>'; 
//            $('form.wpwl-form-card').find('.wpwl-button').before(numberOfInstallmentsHtml);
//          }
//    };

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
        
        
        
        
        /*numberOfStars: 8,
             selectedNumbers: [],
             usedNumbers: [],
             redraws: 5,
             correct: null,
             doneStatus: null*/ 
    };
  },



  
    


  render: function() {    

    return (
      <div id="payment">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
            <PrerequisitePanel />
            <CheckoutPanel />
            {/*<Input2 />*/}

        </div>

      </div>
    );
  }
});

React.render(
  <Payment />,
  document.getElementById('container1')
);
