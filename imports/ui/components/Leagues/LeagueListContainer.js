import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LeagueItem from './LeagueItem';

class LeagueListContainer extends Component {
  state = {
    leagues: undefined,
  };

  componentDidMount() {
    Meteor.call('getLeagues', (err, leagues) => {
      this.setState({
        leagues,
      });
    });
  }

  render() {
    const { leagues } = this.state;
    return (
      <div>
        {leagues
          ? leagues.map(league => (
              <LeagueItem key={league._id} league={league} />
            ))
          : <div>loading</div>}
      </div>
    );
  }
}

export default LeagueListContainer;
