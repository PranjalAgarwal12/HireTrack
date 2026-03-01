import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first");
          return;
        }

        const response = await axios.get(
          `${API}/api/applications/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>My Applications</h1>

      {applications.length === 0 ? (
        <p style={{ textAlign: "center" }}>No applications found.</p>
      ) : (
        <div style={styles.grid}>
          {applications.map((app) => (
            <div key={app._id} style={styles.card}>
              <h3>{app.job.title}</h3>

              <p><strong>Company:</strong> {app.job.company}</p>
              <p><strong>Location:</strong> {app.job.location}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span style={styles.status(app.status)}>
                  {app.status}
                </span>
              </p>
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

  status: (status) => ({
    color:
      status === "accepted"
        ? "green"
        : status === "rejected"
        ? "red"
        : "orange",
    fontWeight: "bold"
  })
};

export default MyApplications;