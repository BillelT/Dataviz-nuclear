import "../stylesheets/Header.scss";

function Header() {
  return (
    <>
      <header className="darkgreen-bg container">
        <nav>
          <ul>
            <li>
              <a href="#carbon" className="font-size-14">
                CO2 et mix énergétique
              </a>
            </li>
            <li>
              <a href="#yield" className="font-size-14">
                Rendement des énergies
              </a>
            </li>
            <li>
              <a href="#cost" className="font-size-14">
                Coût des énergies
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
