import { useState } from "react";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { useAuth } from "../firebase/AuthContext";
import "../styles/auth.css";
import {PasswordInput} from "../components/Account"

export default function Account() {
  const { user } = useAuth();
  const [email] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const handleSaveChanges = async () => {
    try {
      if (user) {
        if (!currentPassword) {
          setMessage("Введіть поточний пароль для підтвердження.");
          setMessageType("error");
          return;
        }
        if (!newPassword) {
          setMessage("Введіть новий пароль.");
          setMessageType("error");
          return;
        }
      
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
  
        await reauthenticateWithCredential(user, credential); //Підтвердження користувача
        await updatePassword(user, newPassword);
  
        setMessage("Пароль успішно змінено!");
        setMessageType("success");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setMessage("Новий пароль має містити мінімум 6 символів.");
        setMessageType("error");
        return;
      }
      console.error("Помилка при зміні пароля:", error);
      alert(`Помилка: ${error.message}`);
    }
  };
  

  return (
    <main className="auth-container">
      <h1 className="auth-title">Мій акаунт</h1>

      <div className="auth-form">
        <label className="auth-label">Email</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          readOnly
          style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
        />

        <PasswordInput
          label="Поточний пароль"
          value={currentPassword}
          onChange={setCurrentPassword}
          showPassword={showCurrentPassword}
          toggleShowPassword={() => setShowCurrentPassword(prev => !prev)}
          placeholder="Введіть поточний пароль"
        />
        <PasswordInput
          label="Новий пароль"
          value={newPassword}
          onChange={setNewPassword}
          showPassword={showNewPassword}
          toggleShowPassword={() => setShowNewPassword(prev => !prev)}
          placeholder="Введіть новий пароль"
        />

        <button className="user-button" onClick={handleSaveChanges}>
          Зберегти зміни
        </button>
        {message && (
          <p className={`error-message ${messageType === "error" ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
