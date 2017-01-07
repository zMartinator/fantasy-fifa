import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const User = (props) => (
  <div>
    { props.user ?
      <p>Hello {props.user.username}</p> :
      <p>No one is logged in.</p>
    }
  </div>
);

export default createContainer( () => ({
  user: Meteor.user()
}), User);
