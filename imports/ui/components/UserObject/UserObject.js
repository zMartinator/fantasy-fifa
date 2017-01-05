import React from 'react';

const UserObject = () => (
  { this.props.user ?
    <p>{this.props.user.username}</p> :
    <p>No one is logged in.</p>
  }
);

export default UserObject;
