import { createClass } from 'react';
import { Players } from 'App/collections/players';

const About = createClass({
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

export default About;
