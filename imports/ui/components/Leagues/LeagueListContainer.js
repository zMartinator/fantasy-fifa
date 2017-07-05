import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withState, lifecycle, compose } from 'recompose';
import LeagueItem from './LeagueItem';
import spinnerWhileLoading from '../Spinner';

export default compose(
  withState('leagues'),
  lifecycle({
    componentDidMount() {
      Meteor.call('getLeagues', (err, leagues) => {
        this.setState({ leagues });
      });
    },
  }),
  spinnerWhileLoading(props => !props.leagues)
)(({ leagues }) =>
  <div>
    {leagues.map(league => <LeagueItem key={league._id} league={league} />)}
  </div>
);
