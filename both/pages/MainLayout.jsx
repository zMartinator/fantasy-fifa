const {
  Grid
} = bootstrap;

// true if we should show an error dialog when there is a connection error.
// Exists so that we don't show a connection error when the app is just
// starting and hasn't had a chance to connect yet.
const ShowConnectionIssues = new ReactiveVar(false);

const CONNECTION_ISSUE_TIMEOUT = 5000;


// Only show the connection error if it has been 5 seconds since the app started
setTimeout(function () {
  ShowConnectionIssues.set(true); // Show the connection error
}, CONNECTION_ISSUE_TIMEOUT);

MainLayout = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
    };
  },

  render() {
    return (
      <Grid>
        <Header />

        <br />
        <LoginButtons align="right"/>
        <UserObject user={this.data.currentUser || {}} />


        <main>
          {this.props.content}
        </main>

        <Footer />
      </Grid>
    );
  }
});
