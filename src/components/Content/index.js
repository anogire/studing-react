import { Switch, Route } from 'react-router-dom';

import { Home } from '../Home';
import { About } from '../About';
import { Users } from '../Users';
import { UserForm } from '../Users/UserForm';
import { Albums } from '../Albums';
import { AlbumForm } from '../Albums/AlbumForm';
import { Photos } from '../Photos';
import { PhotoForm } from '../Photos/PhotoForm';

import { USERS, ALBUMS, PHOTOS } from '../../store/api-connect/api_consts';

export function Content() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path={`${USERS}/new`} component={UserForm} />
      <Route path={`${USERS}/edit/:id`} component={UserForm} />
      <Route path={`${USERS}`} component={Users} />
      <Route path={`${ALBUMS}/new`} component={AlbumForm} />
      <Route path={`${ALBUMS}/edit/:id`} component={AlbumForm} />
      <Route path={`${ALBUMS}`} component={Albums} />
      <Route path={`${PHOTOS}/new`} component={PhotoForm} />
      <Route path={`${PHOTOS}/edit/:id`} component={PhotoForm} />
      <Route path={`${PHOTOS}`} component={Photos} />
      <Route path="/" component={Home} />
    </Switch>
  );
}