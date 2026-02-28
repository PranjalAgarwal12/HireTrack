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
      <h1>Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p>{job.description}</p>

            {role === "candidate" && (
              <button
                style={styles.applyButton}
                onClick={() => handleApply(job._id)}
              >
                Apply
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  applyButton: {
    marginTop: "10px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#10b981",
    color: "white",
    cursor: "pointer",
  },
};

export default ViewJobs;