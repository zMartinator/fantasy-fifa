import { React } from 'react';

const UserObject = React.createClass({
  render() {
    if(this.props.user) {
      return (
        <p>{this.props.user.username}</p>
      );
    } else {
      return (
        <p>"No one is logged in."</p>
      );
    }
  }
});

export default UserObject;
