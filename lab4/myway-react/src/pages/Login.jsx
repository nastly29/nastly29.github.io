import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail]   = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();
  const [error,setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/goals");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("Користувача з такою електронною адресою не знайдено.");
          break;
        case "auth/invalid-credential":
          setError("Невірний пароль. Спробуйте ще раз.");
          break;
        case "auth/invalid-email":
          setError("Невірний формат електронної адреси.");
          break;
        default:
          setError("Сталася помилка. Спробуйте ще раз.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Вхід</h2>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required  autoComplete="new-email"/>
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPass(e.target.value)} required  autoComplete="new-password"/>
        <button type="submit" className="user-button">Увійти</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}