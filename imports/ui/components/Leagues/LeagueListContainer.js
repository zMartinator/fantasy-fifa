import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Leagues } from '../../../api/collections';
import LeagueItem from './LeagueItem';

const LeagueListContainer = (props) => (
  props.leagueListLoading ? (
    <p>Loading // TODO: Loading spinner</p>
  ) : (
    <div>
      {props.leagueList.map( (league) =>
        <LeagueItem
          key={league._id}
          user={props.user}
          leagueInfo={league}
        />
      )}
    </div>
  )
);

export default createContainer( () => {
  let handle = Meteor.subscribe('leagues');

  return {
    user: Meteor.user(),
    leagueListLoading: !handle.ready(),
    leagueList: Leagues.find().fetch(),
  };
}, LeagueListContainer);
