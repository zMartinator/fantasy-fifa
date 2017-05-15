import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import 'react-select/dist/react-select.css';

import Shell from './routes/Shell';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import About from './routes/About';
import Draft from './routes/Draft';

Meteor.startup(() => {
  render(
    <Router>
      <Shell>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/draft/:leagueId" component={Draft} />
          <Route component={NotFound} />
        </Switch>
      </Shell>
    </Router>,
    document.getElementById('app'),
  );
});
