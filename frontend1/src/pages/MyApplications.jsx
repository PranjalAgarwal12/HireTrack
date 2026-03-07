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

      <div style={styles.container}>

        <h1 style={styles.heading}>My Job Applications</h1>

        {applications.length === 0 ? (

          <p style={styles.noData}>No applications found.</p>

        ) : (

          <div style={styles.grid}>

            {applications.map((app) => (

              <div key={app._id} style={styles.card}>

                <h3 style={styles.jobTitle}>{app.job.title}</h3>

                <div style={styles.infoRow}>
                  <span style={styles.label}>Company</span>
                  <span>{app.job.company}</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.label}>Location</span>
                  <span>{app.job.location}</span>
                </div>

                <div style={styles.statusContainer}>
                  <span style={styles.label}>Status</span>
                  <span style={styles.statusBadge(app.status)}>
                    {app.status}
                  </span>
                </div>

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

noData:{
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

jobTitle:{
marginBottom:"15px",
fontSize:"20px",
fontWeight:"600"
},

infoRow:{
display:"flex",
justifyContent:"space-between",
marginBottom:"8px",
fontSize:"14px",
color:"#cbd5f5"
},

label:{
fontWeight:"600",
color:"#94a3b8"
},

statusContainer:{
display:"flex",
justifyContent:"space-between",
marginTop:"15px",
alignItems:"center"
},

statusBadge:(status)=>({

padding:"5px 12px",
borderRadius:"20px",
fontSize:"12px",
fontWeight:"600",
textTransform:"capitalize",

background:
status==="accepted"
? "rgba(34,197,94,0.15)"
: status==="rejected"
? "rgba(239,68,68,0.15)"
: "rgba(245,158,11,0.15)",

color:
status==="accepted"
? "#22c55e"
: status==="rejected"
? "#ef4444"
: "#f59e0b"

})

};

export default MyApplications;