import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
import { Accounts } from 'meteor/accounts-base';

import App from './routes/App';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import About from './routes/About';
import Draft from './routes/Draft';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
  loginPath: '/login',
  signUpPath: '/signup',
  resetPasswordPath: '/reset-password',
  profilePath: '/profile',
  minimumPasswordLength: 6,
  onSignedInHook: () => console.log('SIGNED IN'),
  onSignedOutHook: () => console.log('SIGNED OUT'),
});


Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="about" component={About} />
        <Route path="draft/:leagueId" component={Draft} />
        <Route path="signin" component={ Accounts.ui.LoginForm } formState={ STATES.SIGN_IN } />
        <Route path="signup" component={ Accounts.ui.LoginForm } formState={ STATES.SIGN_UP } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'app' )
  );
});

const SignIn = React.createClass({
  render() {

  }
});
