import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Shell from './Shell';
import Home from './Home';
import About from './About';
import Search from './Search';
import Draft from './Draft';
import Login from './Login';
import NotFound from './NotFound';

const Routes = () => (
  <Router>
    <Shell>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
        <Route path="/draft/:leagueId" component={Draft} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  </Router>
);

export default Routes;
