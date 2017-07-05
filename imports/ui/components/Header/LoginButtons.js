import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { compose, withState, withHandlers } from 'recompose';
import { createContainer } from 'meteor/react-meteor-data';
import { withApollo } from 'react-apollo';

const LoginButtons = ({
  user,
  username,
  onChangeUsername,
  password,
  onChangePassword,
  onLogout,
  onLogin,
  onCreateUser,
}) =>
  user
    ? <div>
        <span
          style={{
            color: '#000000',
            fontSize: '12px',
          }}
        >
          Hello {user.username}
        </span>
        <Button bsSize="xs" bsStyle="primary" onClick={onLogout}>
          Logout
        </Button>
      </div>
    : <div>
        <input
          placeholder="username"
          value={username}
          onChange={onChangeUsername}
          type="text"
          style={{
            color: '#000000',
            maxWidth: '80px',
          }}
        />
        <input
          placeholder="password"
          value={password}
          onChange={onChangePassword}
          type="password"
          style={{
            color: '#000000',
            maxWidth: '80px',
          }}
        />
        <Button bsSize="xs" bsStyle="primary" onClick={onLogin}>
          Login
        </Button>
        <Button bsSize="xs" bsStyle="primary" onClick={onCreateUser}>
          Sign Up
        </Button>
      </div>;

const enhanced = compose(
  withApollo,
  withState('username', 'changeUsername', ''),
  withState('password', 'changePassword', ''),
  withHandlers({
    onChangeUsername: ({ changeUsername }) => e =>
      changeUsername(e.target.value),
    onChangePassword: ({ changePassword }) => e =>
      changePassword(e.target.value),
    onLogout: ({ client }) => () =>
      Meteor.logout(err => {
        if (err) console.log('ERROR logging out!', err);
        return client.resetStore();
      }),
    onLogin: ({ username, password, changeUsername, changePassword }) => () =>
      Meteor.loginWithPassword(username, password, err => {
        if (err) {
          console.log('ERROR logging in!', err);
        } else {
          changeUsername('');
          changePassword('');
        }
      }),
    onCreateUser: ({
      username,
      password,
      changeUsername,
      changePassword,
    }) => () =>
      Accounts.createUser(
        {
          username,
          password,
          profile: {
            team: {
              name: 'teamName',
              players: [],
            },
            draftMoney: 100,
          },
        },
        err => {
          if (err) {
            console.log('ERROR creating user!', err);
          } else {
            changeUsername('');
            changePassword('');
          }
        }
      ),
  })
)(LoginButtons);

export default createContainer(
  () => ({
    user: Meteor.user(),
  }),
  enhanced
);
