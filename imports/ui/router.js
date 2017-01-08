import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';

import Shell from './routes/Shell';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import About from './routes/About';
import Draft from './routes/Draft';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ Shell }>
        <IndexRoute component={ Home } />
        <Route path="about" component={About} />
        <Route path="draft/:leagueId" component={Draft} />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'app' )
  );
});
