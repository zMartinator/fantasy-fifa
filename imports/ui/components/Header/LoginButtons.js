import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class LoginButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.resetInputs = this.resetInputs.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  resetInputs() {
    this.setState({
      username: '',
      password: '',
    });
  }

  changeUsername(event) {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  }

  changePassword(event) {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  }

  onLogin() {
    Meteor.loginWithPassword(this.state.username, this.state.password, err => {
      if (err) {
        console.log('ERROR logging in!');
        console.error(err);
      } else {
        this.resetInputs();
      }
    });
  }

  onCreateUser() {
    Accounts.createUser(
      {
        username: this.state.username,
        password: this.state.password,
      },
      err => {
        if (err) {
          console.log('ERROR creating user!');
          console.error(err);
        } else {
          this.resetInputs();
        }
      },
    );
  }

  onLogout() {
    Meteor.logout(err => {
      if (err) {
        console.log('ERROR logging out!');
        console.error(err);
      }
    });
  }

  render() {
    return this.props.user
      ? <div>
          <span
            style={{
              color: '#000000',
              fontSize: '12px',
            }}
          >
            Hello {this.props.user.username}
          </span>
          <Button bsSize="xs" bsStyle="primary" onClick={this.onLogout}>
            Logout
          </Button>
        </div>
      : <div>
          <input
            placeholder="username"
            value={this.state.username}
            onChange={this.changeUsername}
            type="text"
            style={{
              color: '#000000',
              maxWidth: '80px',
            }}
          />
          <input
            placeholder="password"
            value={this.state.password}
            onChange={this.changePassword}
            type="password"
            style={{
              color: '#000000',
              maxWidth: '80px',
            }}
          />
          <Button bsSize="xs" bsStyle="primary" onClick={this.onLogin}>
            Login
          </Button>
          <Button bsSize="xs" bsStyle="primary" onClick={this.onCreateUser}>
            Sign Up
          </Button>
        </div>;
  }
}

export default createContainer(
  () => ({
    user: Meteor.user(),
  }),
  LoginButtons,
);
