import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return null;
  }

  const decoded = jwtDecode(token);
  const role = decoded.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your Role: {role}</p>

      {role === "recruiter" && (
        <div>
          <button onClick={() => navigate("/post-job")}>
            Post Job
          </button>

          <br /><br />

          <button onClick={() => navigate("/my-jobs")}>
            My Posted Jobs
          </button>
        </div>
      )}

      {role === "candidate" && (
        <div>
          <button onClick={() => navigate("/view-jobs")}>
            View Jobs
          </button>

          <br /><br />

          <button onClick={() => navigate("/my-applications")}>
            My Applications
          </button>
        </div>
      )}

      <br /><br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
