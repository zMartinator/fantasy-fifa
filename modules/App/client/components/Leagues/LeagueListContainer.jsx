import { React } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Leagues } from '/App/collections/leagues';

const LeagueListContainer = React.createClass({
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
