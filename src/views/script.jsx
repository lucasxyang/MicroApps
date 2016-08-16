
var StarsFrame = React.createClass({
    getInitialState: function () {
        //var json1 = require('../../scratch/myStorage.json');

        return {
            ndc: ''
        };
    },
    
//    componentDidMount: function() {
//        LeadsStore.addGetDataListener(this._onGetById);
//    },
    
    render: function() {

    var stars = [];
    for (var i =0; i < this.props.numberOfStars; i++) {
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
      );
    }

//    var wpwlOptions = {style: "card"};
//    console.log(json1);

    return (
        <div>
            <form action="https://docs.payon.com/tutorials/integration-guide/customisation/" className="paymentWidgets">VISA MASTER AMEX DISCOVER</form>
        </div>
    );
    }
});






var Game = React.createClass({
  getInitialState: function() {
    return { numberOfStars: 8,
             selectedNumbers: [],
             usedNumbers: [],
             redraws: 5,
             correct: null,
             doneStatus: null };
  },



  
    


  render: function() {
    var numberOfStars = this.state.numberOfStars;
    

    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />

        </div>

      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('container1')
);
