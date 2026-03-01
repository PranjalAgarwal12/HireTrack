import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://hiretrack-backend.onrender.com/api/jobs/my-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setJobs(response.data);

      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>My Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No jobs posted yet.</p>
      ) : (
        <div style={styles.grid}>
          {jobs.map((job) => (
            <div key={job._id} style={styles.card}>
              <h3 style={styles.title}>{job.title}</h3>

              <p><strong>Company:</strong> {job.company}</p>

              <button
                style={styles.button}
                onClick={() => navigate(`/view-applicants/${job._id}`)}
              >
                View Applicants
              </button>
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
    fontFamily: "Arial"
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  title: {
    marginBottom: "10px"
  },

  button: {
    marginTop: "15px",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#6366f1",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default RecruiterJobs;