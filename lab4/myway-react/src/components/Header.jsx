import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../firebase/AuthContext";

export default function Header() {
  const {user, signOut} = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch(error){
      console.error("Поилка при виході:", error);
    }
  }

    return(
        <header className="header-background">
      <nav>
        <div className="logo">
          <span className="black">My</span><span className="orange">Way</span>
        </div>
        <div className="menu-links">
          <Link to="/">Головна</Link>
          <Link to="/community">Спільнота</Link>
        </div>
        <div className="dropdown">
          <button className="user-button">
            {user ? user.email : "Обліковий запис"}
          </button>
          <div className="dropdown-content">
            { user
              ? (<>
                <Link to="/goals">Мої цілі</Link>
                <Link to="/progress">Прогрес</Link>
                <Link to="/account">Акаунт</Link>
                <button className="user-button logout-btn" onClick={handleSignOut}>Вийти</button>
              </>) 
              : (<>
                <Link to="/login">Увійти</Link>
                <Link to="/register">Реєстрація</Link>
              </>)
            }
          </div>
        </div>
      </nav>
    </header>
    );
}