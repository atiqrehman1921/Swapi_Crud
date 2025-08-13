import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import "../styles/Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertProps, setAlertProps] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const domain = sessionStorage.getItem("Domain");
    const url = `${domain}/api/Starships/signup`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { success: true, message: responseText };
      }

      setLoading(false);

      if (!response.ok || !result.success) {
        setAlertProps({
          type: "error",
          title: "Signup Failed",
          message: result.message || "Something went wrong during signup.",
          onClose: () => setAlertProps(null),
        });
        return;
      }

      // Success
      setAlertProps({
        type: "success",
        title: "Success",
        message: result.message || "User registered successfully.",
        timer: 2000,
        onClose: () => {
          setAlertProps(null);
          navigate("/login");
        },
      });
    } catch (error) {
      setLoading(false);
      setAlertProps({
        type: "error",
        title: "Error",
        message: error.message || "Please check your connection.",
        onClose: () => setAlertProps(null),
      });
    }
  };

  return (
    <div className="auth-container relative">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-50">
          <div
            className="w-20 h-20 border-6 border-red-700 border-t-transparent rounded-full animate-spin drop-shadow-lg"
            aria-label="Loading spinner"
          ></div>
        </div>
      )}

      {alertProps && <Alert {...alertProps} />}

      <div className="auth-form animate-fadeInScale relative top-[30px]">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="btn-primary w-full py-2 !bg-red-600 hover:!bg-red-700 text-black rounded disabled:opacity-50"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>
        <p className="auth-footer mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
