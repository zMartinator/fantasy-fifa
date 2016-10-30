import React, { createClass } from 'react';

const LeagueCreationForm = createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    let formLeagueName = React.findDOMNode(this.refs.leagueName).value.trim();
    let formLeagueUserSize = React.findDOMNode(this.refs.leagueUserSize).value;
    let formMaxTeamSize = React.findDOMNode(this.refs.maxTeamSize).value;
    let formAuctionStartingMoney = React.findDOMNode(this.refs.auctionStartingMoney).value;
    let formTimeBetweenNomination = React.findDOMNode(this.refs.timeBetweenNomination).value;
    let formBidTime = React.findDOMNode(this.refs.bidTime).value;
    //let formLeagueIsDivisions = React.findDOMNode(this.refs.leagueIsDivisions).checked;

    try {
      formLeagueUserSize = parseInt( formLeagueUserSize );
      formMaxTeamSize = parseInt( formMaxTeamSize );
      formAuctionStartingMoney = parseInt( formAuctionStartingMoney );
      formTimeBetweenNomination = parseInt( formTimeBetweenNomination );
      formBidTime = parseInt( formBidTime );
    } catch(e) {
      throw new Meteor.Error("NaN", "Not a Number");
    }

    if (!formLeagueName ||
        !formLeagueUserSize ||
        !formMaxTeamSize ||
        !formAuctionStartingMoney ||
        !formTimeBetweenNomination ||
        !formBidTime) {
      return;
    }

    // Save to Server
    Meteor.call("CreateLeague", formLeagueName, formLeagueUserSize, formMaxTeamSize, formAuctionStartingMoney, formTimeBetweenNomination, formBidTime);

    // RESET FORM
    React.findDOMNode(this.refs.leagueName).value = "";
    React.findDOMNode(this.refs.leagueUserSize).value = 4;
    //React.findDOMNode(this.refs.leagueIsDivisions).checked = true;
    /*
    <div className="checkbox">
      <label>
        <input type="checkbox" defaultChecked="true" ref="leagueIsDivisions"/> Divisions
      </label>
    </div>
    */

    if(this.props.doneCallback) {
      this.props.doneCallback();
    }
    return;
  },
  render: function() {
    return (

      <form className="leagueCreationForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="leagueName">League name</label>
          <input type="text" id="leagueName" ref="leagueName" className="form-control" placeholder="e.g., Romeo Rumble" maxLength="30"/>
        </div>
        <div className="form-group">
          <label htmlFor="leagueUserSize">Max League Size</label>
          <input type="number" min="2" max="128" step="1" defaultValue="4" className="form-control" id="leagueUserSize" ref="leagueUserSize" />
        </div>
        <div className="form-group">
          <label htmlFor="maxTeamSize">Max Team Size</label>
          <input type="number" min="1" max="100" step="1" defaultValue="18" className="form-control" id="maxTeamSize" ref="maxTeamSize" />
        </div>
        <div className="form-group">
          <label htmlFor="auctionStartingMoney">Starting Auction Money</label>
          <input type="number" min="1" step="1" defaultValue="100" className="form-control" id="auctionStartingMoney" ref="auctionStartingMoney" />
        </div>
        <div className="form-group">
          <label htmlFor="timeBetweenNomination">Time Between Nomination</label>
          <input type="number" min="5" step="1" defaultValue="15" className="form-control" id="timeBetweenNomination" ref="timeBetweenNomination" />
        </div>
        <div className="form-group">
          <label htmlFor="bidTime">Bid Time</label>
          <input type="number" min="5" step="1" defaultValue="10" className="form-control" id="bidTime" ref="bidTime" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-default" onClick={this.props.doneCallback}>Close</button>
      </form>
    );
  }
});

export default LeagueCreationForm;
