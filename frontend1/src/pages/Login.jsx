import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://hiretrack-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable. Check backend.");
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      <button onClick={() => navigate("/register")}>
        Don't have an account? Register
      </button>
    </div>
  );
}

export default Login;