import { Meteor } from 'meteor/meteor';
import React, { createClass } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Leagues } from '../../../api/collections';
import LeagueList from './LeagueList';

const LeagueListContainer = createClass({
  render() {
    if(this.props.leagueListLoading) {
      return (
        <ListGroup>
          <ListGroupItem>
            Loading // TODO: Loading spinner
          </ListGroupItem>
        </ListGroup>
      );
    }

    return (
      <LeagueList currentUser={this.props.currentUser} leagues={this.props.leagueList}/>
    );
  }
});

export default createContainer( () => {
  let handle = Meteor.subscribe("leagues");

  return {
    leagueListLoading: !handle.ready(),
    leagueList: Leagues.find().fetch()
  };
}, LeagueListContainer);
