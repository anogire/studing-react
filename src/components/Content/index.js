import { Switch, Route } from 'react-router-dom';

import Contacts from '../Contacts';
import { About } from '../About';
import { Home } from '../Home';

export function Content() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/" component={Home} />
    </Switch>
  );
}