import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { USERS, ALBUMS, PHOTOS } from '../../store/api-connect/api_consts';

import './style.scss';

export function Header() {
  return (
    <AppBar className="Header-section" position="static">
      <Toolbar>
        <Button color="primary" component={NavLink} to="/" exact className="btn-nav" activeClassName="btn-active">
          Home
        </Button>
        <Button color="primary" component={NavLink} to="/about" className="btn-nav" activeClassName="btn-active">
          About
        </Button>
        <Button color="primary" component={NavLink} to={USERS} className="btn-nav" activeClassName="btn-active">
          Users
        </Button>
        <Button color="primary" component={NavLink} to={ALBUMS} className="btn-nav" activeClassName="btn-active">
          Albums
        </Button>
        <Button color="primary" component={NavLink} to={PHOTOS} className="btn-nav" activeClassName="btn-active">
          Photos
        </Button>
      </Toolbar>
    </AppBar>
  )
}