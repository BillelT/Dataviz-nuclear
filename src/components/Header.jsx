import "../stylesheets/Header.scss";

function Header() {
  return (
    <>
      <header className="darkgreen-bg container">
        <nav>
          <ul>
            <li>
              <a href="#mix" className="font-size-14 link">
                CO₂ et mix énergétique
              </a>
            </li>
            <li>
              <a href="#yield" className="font-size-14 link">
                Rendement des énergies
              </a>
            </li>
            <li>
              <a href="#cost" className="font-size-14 link">
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
