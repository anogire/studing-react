import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

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
        <Button color="primary" component={NavLink} to="/users" className="btn-nav" activeClassName="btn-active">
          Users
        </Button>
      </Toolbar>
    </AppBar>
  )
}