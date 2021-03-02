import { Switch, Route } from 'react-router-dom';

import { Users } from '../Users';
import { UserForm } from '../Users/UserForm';
import { About } from '../About';
import { Home } from '../Home';

export function Content() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/users/new" component={UserForm} />
      <Route path="/users/edit/:id" component={UserForm} />
      <Route path="/users" component={Users} />
      <Route path="/" component={Home} />
    </Switch>
  );
}