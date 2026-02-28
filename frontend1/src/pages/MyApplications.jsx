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
    <div>
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{app.job.title}</h3>
            <p><strong>Company:</strong> {app.job.company}</p>
            <p><strong>Location:</strong> {app.job.location}</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;