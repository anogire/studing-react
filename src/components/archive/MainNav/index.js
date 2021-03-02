import { NavLink } from 'react-router-dom';
import './style.scss';

export function MainNav() {
  return (
    <section className="MainNav-section">
      <nav className="MainNav-nav">
        <NavLink to="/" exact className="btn outline-primary nav-link" activeClassName="btn-primary">
          Home
        </NavLink>
        <NavLink to="/about" className="btn outline-primary nav-link" activeClassName="btn-primary">
          About
        </NavLink>
        <NavLink to="/users" className="btn outline-primary nav-link" activeClassName="btn-primary">
          Users
        </NavLink>
      </nav>
    </section>
  )
}