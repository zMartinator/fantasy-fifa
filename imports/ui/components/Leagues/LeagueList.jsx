import React, { createClass } from 'react';
import { ListGroup } from 'react-bootstrap';
import LeagueItem from './LeagueItem';

const LeagueList = createClass({
  render() {
    return (
      <ListGroup>
        {this.props.leagues.map((league) => {
          return <LeagueItem currentUser={this.props.currentUser} leagueInfo={league} key={league._id} />;
        })}
      </ListGroup>
    );
  }
});

export default LeagueList;
