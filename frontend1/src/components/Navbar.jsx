import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = import.meta.env.VITE_API_URL;

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API}/api/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        `${API}/api/applications/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error applying");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>All Available Jobs</h1>

      {jobs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No jobs available.</p>
      ) : (
        <div style={styles.grid}>
          {jobs.map((job) => (
            <div key={job._id} style={styles.card}>
              <h3 style={styles.title}>{job.title}</h3>

              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>

              <p style={styles.desc}>{job.description}</p>

              {role === "candidate" && (
                <button
                  style={styles.applyBtn}
                  onClick={() => handleApply(job._id)}
                >
                  Apply Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: "10px",
    color: "#333",
  },

  desc: {
    marginTop: "10px",
    color: "#666",
    fontSize: "14px",
  },

  applyBtn: {
    marginTop: "15px",
    padding: "10px",
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ViewJobs;