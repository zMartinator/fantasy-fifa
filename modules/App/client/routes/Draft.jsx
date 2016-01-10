import { createClass } from 'react';
import { Leagues } from 'App/collections/leagues';
import { Grid, Row, Col } from 'react-bootstrap';

const Draft = createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    let handle = Meteor.subscribe("league", this.props.params.leagueId);
    let usersHandle = Meteor.subscribe("usersInLeague", this.props.params.leagueId);

    return {
      subsLoading: !handle.ready(),
      currentUser: Meteor.user(),
      currentLeague: Leagues.findOne(),
      currentLeagueUsers: Meteor.users.find().fetch()
    };
  },


  handleBid() {
    Meteor.call("bidOnPlayer", this.data.currentLeague._id, this.data.currentLeague.currentBids[this.data.currentLeague.currentBids.length - 1].value + 1, Meteor.userId() );
  },
  render() {
    /*
    <Col xs={12} md={8} lg={8}>
      <DraftCurrentPlayer
        currentUser={this.data.currentUser}
        currentLeague={this.data.currentLeague}
      />
    </Col>
    */

    if(this.data.subsLoading) {
      return (
        <Grid fluid={true}>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h3 className="text-center">
                Loading...
              </h3>
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <Grid fluid={true}>
        <DraftStatusBanner isDone={this.data.currentLeague.isDraftDone} />
        <DraftStartButton
          currentUser={this.data.currentUser}
          currentLeague={this.data.currentLeague}
        />
        <Row>
          <Col xs={12} md={12} lg={12}>
            <DraftCurrentBid
              handleBidCallback={this.handleBid}
              currentUser={this.data.currentUser}
              currentLeague={this.data.currentLeague}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <DraftPlayerPicker
              currentUser={this.data.currentUser}
              currentLeague={this.data.currentLeague}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <DraftBoard
              currentLeagueUsers={this.data.currentLeagueUsers}
              currentLeague={this.data.currentLeague}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
});

export default Draft;
