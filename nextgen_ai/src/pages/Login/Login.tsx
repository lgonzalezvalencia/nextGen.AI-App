import { useState } from "react";
import styles from "./Login.module.scss";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "test@test.com" && password === "test") {
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NextGen.AI</h1>

      <input
        type="email"
        placeholder="Email Address"
        className={styles.emailInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className={styles.passwordInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <a href="#" className={styles.forgotPassword}>
        Forgot Password?
      </a>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button className={styles.loginButton} onClick={handleLogin}>
        Log In
      </button>

      <div className={styles.footerLine}></div>

      <p className={styles.footerText}>Deloitte © 2026.</p>
    </div>
  );
};

export default Login;
