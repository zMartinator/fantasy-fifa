import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { App } from './App';
import { NotFound } from './routes/NotFound';
import { Home } from './routes/Home';
import { About } from './routes/About';
import { Draft } from './routes/Draft';

render((
  <Router history={browserHistory}>
    <Route path="*" component={NotFound} />
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="draft/:leagueId" component={Draft} />
    </Route>
  </Router>
), document.getElementById('app') );
