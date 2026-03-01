import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://hiretrack-backend.onrender.com/api/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(response.data);

    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://hiretrack-backend.onrender.com/api/applications/status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Status updated");
      fetchApplicants();

    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Job Applicants</h1>

      {applications.length === 0 ? (
        <p style={{ textAlign: "center" }}>No applicants yet.</p>
      ) : (
        <div style={styles.grid}>
          {applications.map((app) => (
            <div key={app._id} style={styles.card}>
              <h3>{app.applicant.name}</h3>

              <p><strong>Email:</strong> {app.applicant.email}</p>
              <p><strong>Status:</strong> {app.status}</p>

              {app.status === "pending" && (
                <div style={styles.buttons}>
                  <button
                    style={styles.acceptBtn}
                    onClick={() => updateStatus(app._id, "accepted")}
                  >
                    Accept
                  </button>

                  <button
                    style={styles.rejectBtn}
                    onClick={() => updateStatus(app._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
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

  buttons: {
    marginTop: "15px",
    display: "flex",
    gap: "10px"
  },

  acceptBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#10b981",
    color: "white",
    cursor: "pointer"
  },

  rejectBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer"
  }
};

export default ViewApplicants;