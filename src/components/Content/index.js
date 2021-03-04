import { Switch, Route } from 'react-router-dom';

import { Users } from '../Users';
import { UserForm } from '../Users/UserForm';
import { About } from '../About';
import { Home } from '../Home';
import { Albums } from '../Albums';
import { USERS, ALBUMS } from '../../actions/api_consts';

export function Content() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path={`${USERS}/new`} component={UserForm} />
      <Route path={`${USERS}/edit/:id`} component={UserForm} />
      <Route path={`${USERS}`} component={Users} />
      {/* <Route path={`${ALBUMS}/new`} component={UserForm} />
      <Route path={`${ALBUMS}/edit/:id`} component={UserForm} /> */}
      <Route path={`${ALBUMS}`} component={Albums} />
      <Route path="/" component={Home} />
    </Switch>
  );
}