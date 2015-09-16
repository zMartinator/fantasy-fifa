const {
  Grid,
  Row,
  Col
} = bootstrap;


Home = React.createClass({
  render() {
    return (
      <Grid>
        <h1>Join A League!</h1>
        <LeagueListContainer />
      </Grid>
    );
  }
});
