import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://hiretrack-backend.onrender.com/api/jobs"
        );
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

      await axios.post(
        `https://hiretrack-backend.onrender.com/api/applications/${jobId}`,
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
      <h1 style={styles.heading}>Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div style={styles.grid}>
          {jobs.map((job) => (
            <div key={job._id} style={styles.card}>
              <h3 style={styles.jobTitle}>{job.title}</h3>

              <p style={styles.info}><strong>Company:</strong> {job.company}</p>
              <p style={styles.info}><strong>Location:</strong> {job.location}</p>
              <p style={styles.info}><strong>Salary:</strong> {job.salary}</p>

              <p style={styles.description}>{job.description}</p>

              {role === "candidate" && (
                <button
                  style={styles.applyButton}
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
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },

  jobTitle: {
    marginBottom: "10px",
    color: "#333",
  },

  info: {
    margin: "4px 0",
    color: "#555",
  },

  description: {
    marginTop: "10px",
    color: "#666",
    fontSize: "14px",
  },

  applyButton: {
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#6366f1",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ViewJobs;