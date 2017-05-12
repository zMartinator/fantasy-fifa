import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class LeagueCreationForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const formLeagueName = this.leagueName.value.trim();
    let formLeagueUserSize = this.leagueUserSize.value;
    let formMaxTeamSize = this.maxTeamSize.value;
    let formAuctionStartingMoney = this.auctionStartingMoney.value;
    let formTimeBetweenNomination = this.timeBetweenNomination.value;
    let formBidTime = this.bidTime.value;

    try {
      formLeagueUserSize = parseInt(formLeagueUserSize);
      formMaxTeamSize = parseInt(formMaxTeamSize);
      formAuctionStartingMoney = parseInt(formAuctionStartingMoney);
      formTimeBetweenNomination = parseInt(formTimeBetweenNomination);
      formBidTime = parseInt(formBidTime);
    } catch (e) {
      throw new Meteor.Error('NaN', 'Not a Number');
    }

    if (
      !formLeagueName ||
      !formLeagueUserSize ||
      !formMaxTeamSize ||
      !formAuctionStartingMoney ||
      !formTimeBetweenNomination ||
      !formBidTime
    ) {
      return;
    }

    // Save to Server
    Meteor.call(
      'CreateLeague',
      formLeagueName,
      formLeagueUserSize,
      formMaxTeamSize,
      formAuctionStartingMoney,
      formTimeBetweenNomination,
      formBidTime,
    );

    // RESET FORM
    // React.findDOMNode(this.refs.leagueName).value = '';
    // React.findDOMNode(this.refs.leagueUserSize).value = 4;

    if (this.props.doneCallback) {
      this.props.doneCallback();
    }
    return;
  }

  render() {
    return (
      <form className="leagueCreationForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="leagueName">League name</label>
          <input
            type="text"
            id="leagueName"
            ref={node => (this.leagueName = node)}
            className="form-control"
            placeholder="e.g., Romeo Rumble"
            maxLength="30"
          />
        </div>
        <div className="form-group">
          <label htmlFor="leagueUserSize">Max League Size</label>
          <input
            type="number"
            min="2"
            max="128"
            step="1"
            defaultValue="4"
            className="form-control"
            id="leagueUserSize"
            ref={node => (this.leagueUserSize = node)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxTeamSize">Max Team Size</label>
          <input
            type="number"
            min="1"
            max="100"
            step="1"
            defaultValue="18"
            className="form-control"
            id="maxTeamSize"
            ref={node => (this.maxTeamSize = node)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="auctionStartingMoney">Starting Auction Money</label>
          <input
            type="number"
            min="1"
            step="1"
            defaultValue="100"
            className="form-control"
            id="auctionStartingMoney"
            ref={node => (this.auctionStartingMoney = node)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeBetweenNomination">Time Between Nomination</label>
          <input
            type="number"
            min="5"
            step="1"
            defaultValue="15"
            className="form-control"
            id="timeBetweenNomination"
            ref={node => (this.timeBetweenNomination = node)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bidTime">Bid Time</label>
          <input
            type="number"
            min="5"
            step="1"
            defaultValue="10"
            className="form-control"
            id="bidTime"
            ref={node => (this.bidTime = node)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <button
          type="button"
          className="btn btn-default"
          onClick={this.props.doneCallback}
        >
          Close
        </button>
      </form>
    );
  }
}

export default LeagueCreationForm;
