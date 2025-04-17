import {Link, useLocation} from "react-router-dom"

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

    return(
        <header className="header-background">
      <nav>
        <div className="logo">
          <span className="black">My</span><span className="orange">Way</span>
        </div>
        <div className="menu-links">
          {currentPath !== "/" && <Link to="/">Головна</Link>}
          {currentPath !== "/community" && <Link to="/community">Спільнота</Link>}
        </div>
        <div className="dropdown">
          <button className="user-button">Обліковий запис</button>
          <div className="dropdown-content">
            {currentPath !== "/goals" && <Link to="/goals">Мої цілі</Link>}
            {currentPath !== "/progress" && <Link to="/progress">Прогрес</Link>}
          </div>
        </div>
      </nav>
    </header>
    );
}