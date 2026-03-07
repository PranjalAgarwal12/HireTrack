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

      <div style={styles.container}>

        <h1 style={styles.heading}>My Posted Jobs</h1>

        {jobs.length === 0 ? (

          <p style={styles.noJobs}>
            You haven't posted any jobs yet.
          </p>

        ) : (

          <div style={styles.grid}>

            {jobs.map((job) => (

              <div key={job._id} style={styles.card}>

                <h3 style={styles.title}>{job.title}</h3>

                <p style={styles.company}>
                  Company: {job.company}
                </p>

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

    </div>

  );

}

const styles = {

page:{
minHeight:"100vh",
background:"#0f172a",
padding:"60px 20px",
fontFamily:"Inter, sans-serif"
},

container:{
maxWidth:"1100px",
margin:"auto"
},

heading:{
textAlign:"center",
marginBottom:"40px",
color:"white",
fontSize:"32px",
fontWeight:"600"
},

noJobs:{
textAlign:"center",
color:"#94a3b8",
fontSize:"18px"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"28px"
},

card:{
background:"#1e293b",
padding:"28px",
borderRadius:"14px",
boxShadow:"0 10px 25px rgba(0,0,0,0.35)",
border:"1px solid rgba(255,255,255,0.05)",
transition:"all 0.25s ease",
color:"white"
},

title:{
fontSize:"20px",
marginBottom:"10px",
fontWeight:"600"
},

company:{
color:"#cbd5f5",
marginBottom:"18px",
fontSize:"14px"
},

button:{
padding:"10px 16px",
border:"none",
borderRadius:"8px",
background:"linear-gradient(135deg,#6366f1,#7c3aed)",
color:"white",
cursor:"pointer",
fontWeight:"600",
fontSize:"14px"
}

};

export default RecruiterJobs;