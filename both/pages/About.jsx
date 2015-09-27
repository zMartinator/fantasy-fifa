About = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {

    let handle = Meteor.subscribe("players");

    return {
      draftLoading: !handle.ready(),
      players: Players.find().fetch(),
      currentUser: Meteor.user()
    };
  },

  render() {
    return (
      <div className='About'>
        <h1>About</h1>
      </div>
    );
  }
});
