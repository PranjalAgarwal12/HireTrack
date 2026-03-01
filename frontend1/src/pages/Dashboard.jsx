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
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        fontFamily: "Arial",
        padding: "40px"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>HireTrack Dashboard</h2>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ marginTop: "10px", color: "#555" }}>
        Your Role: <b>{role}</b>
      </p>

      {/* Recruiter Options */}
      {role === "recruiter" && (
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          <div
            onClick={() => navigate("/post-job")}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <h3>Post Job</h3>
            <p>Create a new job listing.</p>
          </div>

          <div
            onClick={() => navigate("/my-jobs")}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <h3>My Posted Jobs</h3>
            <p>Manage jobs you created.</p>
          </div>
        </div>
      )}

      {/* Candidate Options */}
      {role === "candidate" && (
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          <div
            onClick={() => navigate("/view-jobs")}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <h3>View Jobs</h3>
            <p>Browse available job opportunities.</p>
          </div>

          <div
            onClick={() => navigate("/my-applications")}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <h3>My Applications</h3>
            <p>Track jobs you applied for.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;