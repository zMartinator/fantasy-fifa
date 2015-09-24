const {
  Grid,
  Row,
  Col,
  Button
} = bootstrap;

Draft = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    let handle = Meteor.subscribe("draftAndLeagueByDraftId", this.props.params.draftId);

    return {
      draftLoading: !handle.ready(),
      currentDraft: Drafts.findOne(this.props.params.draftId),
      currentUser: Meteor.user(),
      currentLeague: Leagues.findOne(),
      currentPlayer: null
    };
  },


  handleBid() {
    console.log("Trying Handle Bid!");
  },
  render() {

    if(this.data.draftLoading) {
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
        <DraftStatusBanner isDone={this.data.currentDraft.isDone}/>
        <DraftStartButton
          currentUser={this.data.currentUser}
          currentDraft={this.data.currentDraft}
          currentLeague={this.data.currentLeague}
        />
        <Row>
          <Col xs={12} md={4} lg={4}>
            <DraftCurrentBid
              handleBidCallback={this.handleBid}
              currentUser={this.data.currentUser}
              currentDraft={this.data.currentDraft}
              currentLeague={this.data.currentLeague}
            />
          </Col>
          <Col xs={12} md={8} lg={8}>
            <DraftCurrentPlayer
              currentUser={this.data.currentUser}
              currentDraft={this.data.currentDraft}
              currentLeague={this.data.currentLeague}
              currentPlayer={this.data.currentPlayer}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <DraftPlayerPicker
              currentUser={this.data.currentUser}
              currentDraft={this.data.currentDraft}
              currentLeague={this.data.currentLeague}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
});
