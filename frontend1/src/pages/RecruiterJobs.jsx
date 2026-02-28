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
          "http://localhost:5000/api/jobs/my-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setJobs(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <div>
      <h1>My Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>

            <button onClick={() => navigate(`/view-applicants/${job._id}`)}>
              View Applicants
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RecruiterJobs;
