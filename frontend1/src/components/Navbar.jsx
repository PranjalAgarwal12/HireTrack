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
      <div style={styles.container}>
        <h1 style={styles.heading}>Explore Job Opportunities</h1>

        {jobs.length === 0 ? (
          <p style={styles.noJobs}>No jobs available.</p>
        ) : (
          <div style={styles.grid}>
            {jobs.map((job) => (
              <div key={job._id} style={styles.card}>
                <h3 style={styles.title}>{job.title}</h3>

                <div style={styles.tags}>
                  <span style={styles.tag}>{job.company}</span>
                  <span style={styles.tag}>{job.location}</span>
                  <span style={styles.tag}>{job.salary}</span>
                </div>

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
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#0f172a",
    padding: "60px 20px",
    fontFamily: "Inter, sans-serif"
  },

  container: {
    maxWidth: "1200px",
    margin: "auto"
  },

  heading: {
    textAlign: "center",
    color: "white",
    fontSize: "34px",
    fontWeight: "600",
    marginBottom: "40px"
  },

  noJobs: {
    textAlign: "center",
    color: "#cbd5f5",
    fontSize: "18px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "28px"
  },

  card: {
    background: "#1e293b",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    transition: "all 0.25s ease",
    color: "white"
  },

  title: {
    fontSize: "20px",
    marginBottom: "12px",
    fontWeight: "600"
  },

  tags: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "12px"
  },

  tag: {
    background: "#334155",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#e2e8f0"
  },

  desc: {
    fontSize: "14px",
    color: "#cbd5f5",
    lineHeight: "1.6"
  },

  applyBtn: {
    marginTop: "18px",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg,#6366f1,#7c3aed)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px"
  }

};

export default ViewJobs;