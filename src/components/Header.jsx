import "../stylesheets/Header.scss";

function Header() {
  return (
    <>
      <header className="darkgreen-bg container">
        <nav>
          <ul>
            <li>
              <a href="#article1">CO2 et mix énergétique</a>
            </li>
            <li>
              <a href="#article1">Rendement des énergies</a>
            </li>
            <li>
              <a href="#article1">Coût des énergies</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
