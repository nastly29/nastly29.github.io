import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { saveUserProfile } from "../firebase/firestoreService";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      await saveUserProfile(uid, {
        email,
        coins: 0
      });
      navigate("/goals");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Користувач з такою електронною адресою вже існує.");
          break;
        case "auth/invalid-email":
          setError("Невірний формат електронної адреси.");
          break;
        case "auth/weak-password":
          setError("Пароль повинен містити щонайменше 6 символів.");
          break;
        default:
          setError("Сталася помилка. Спробуйте ще раз.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Реєстрація</h2>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="new-email"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPass(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button type="submit" className="user-button">Зареєструватися</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
