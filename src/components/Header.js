import year from '../img/2021-1.jpg';
import '../styles/Header.css';

function Header() {
  return (
    <header className="container-fluid Header-main">
      <img src={year} width="524" height="329" alt="Happy New Year 2021" />
    </header>
  );
}

export default Header;