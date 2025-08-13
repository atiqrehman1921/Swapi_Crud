import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const domain = sessionStorage.getItem("Domain");
  const url = `${domain}/api/Starships/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok && result.token) {
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("Active", "1");

      setAlertData({
        type: "success",
        title: "Login Successful",
        message: result.message || "Welcome back!",
      });
      setShowAlert(true);
    } else {
      setMessage(result.message || "Invalid email or password.");
      sessionStorage.setItem("Active", "0");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    setMessage("Something went wrong. Please try again.");
    sessionStorage.setItem("Active", "0");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-form animate-fadeInScale relative top-[30px]">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Log In
          </button>
        </form>
        {message && (
          <p style={{ marginTop: "10px", color: "red" }}>{message}</p>
        )}
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      {/* Show alert when login is successful */}
      {showAlert && (
        <Alert
          type={alertData.type}
          title={alertData.title}
          message={alertData.message}
          onClose={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default Login;
