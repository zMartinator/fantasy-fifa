import React, { createClass } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Leagues } from '../../../api/collections';
import LeagueList from './LeagueList';

const LeagueListContainer = createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let handle = Meteor.subscribe("leagues");

    return {
      leagueListLoading: !handle.ready(),
      leagueList: Leagues.find().fetch()
    };
  },
  render() {
    if(this.data.leagueListLoading) {
      return (
        <ListGroup>
          <ListGroupItem>
            Loading // TODO: Loading spinner
          </ListGroupItem>
        </ListGroup>
      );
    }

    return (
      <LeagueList currentUser={this.props.currentUser} leagues={this.data.leagueList}/>
    );
  }
});

export default LeagueListContainer;
