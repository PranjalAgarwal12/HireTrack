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
        `http://localhost:5000/api/applications/job/${jobId}`,
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

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/applications/status/${applicationId}`,
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
    <div>
      <h1>Applicants</h1>

      {applications.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id}>
            <p>Name: {app.applicant.name}</p>
            <p>Email: {app.applicant.email}</p>
            <p>Status: {app.status}</p>

            {app.status === "applied" && (
              <>
                <button onClick={() => updateStatus(app._id, "selected")}>
                  Accept
                </button>

                <button onClick={() => updateStatus(app._id, "rejected")}>
                  Reject
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ViewApplicants;
