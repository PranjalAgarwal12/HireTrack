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
          "http://localhost:5000/api/jobs"
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

  // 🔥 APPLY FUNCTION
  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/applications/${jobId}`,
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
    <div>
      <h1>All Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p>{job.description}</p>

            {/* 🔥 Only candidates can apply */}
            {role === "candidate" && (
              <button onClick={() => handleApply(job._id)}>
                Apply
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ViewJobs;
