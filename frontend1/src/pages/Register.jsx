import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
       "https://hiretrack-backend.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(response.data.message || "Registration Successful");
      navigate("/");

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable. Check backend.");
      }
    }
  };

  return (
    <div>
      <h1>Register Page</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

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

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="candidate">Candidate</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>Register</button>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default Register;
