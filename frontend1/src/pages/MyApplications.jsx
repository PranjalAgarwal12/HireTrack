import React, { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setApplications(response.data);

      } catch (error) {
        console.error(error);
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
          <div key={app._id}>
            <h3>{app.job.title}</h3>
            <p>Company: {app.job.company}</p>
            <p>Location: {app.job.location}</p>
            <p>Status: {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;
