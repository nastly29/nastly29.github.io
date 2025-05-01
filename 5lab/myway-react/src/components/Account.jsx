export function PasswordInput({ label, value, onChange, showPassword, toggleShowPassword, placeholder }) {
    return (
      <>
        <label className="auth-label">{label}</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="auth-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? "🙉" : "🙈"}
          </button>
        </div>
      </>
    );
  }
  