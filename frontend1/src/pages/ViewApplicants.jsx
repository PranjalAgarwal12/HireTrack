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
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setApplications(response.data);

    } catch (error) {

      console.error("Error fetching applicants:", error);

    }

  };

  const updateStatus = async (applicationId,status) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://hiretrack-backend.onrender.com/api/applications/status/${applicationId}`,
        {status},
        {
          headers:{
            Authorization:`Bearer ${token}`
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

      <div style={styles.container}>

        <h1 style={styles.heading}>Job Applicants</h1>

        {applications.length===0 ? (

          <p style={styles.noApplicants}>
            No applicants yet.
          </p>

        ) : (

          <div style={styles.grid}>

            {applications.map((app)=>(

              <div key={app._id} style={styles.card}>

                <h3 style={styles.name}>
                  {app.applicant.name}
                </h3>

                <p style={styles.email}>
                  {app.applicant.email}
                </p>

                <div style={styles.statusRow}>

                  <span style={styles.label}>
                    Status
                  </span>

                  <span style={styles.statusBadge(app.status)}>
                    {app.status}
                  </span>

                </div>

                {app.status==="pending" && (

                  <div style={styles.buttons}>

                    <button
                      style={styles.acceptBtn}
                      onClick={()=>updateStatus(app._id,"accepted")}
                    >
                      Accept
                    </button>

                    <button
                      style={styles.rejectBtn}
                      onClick={()=>updateStatus(app._id,"rejected")}
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

noApplicants:{
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
color:"white"
},

name:{
fontSize:"20px",
marginBottom:"6px",
fontWeight:"600"
},

email:{
fontSize:"14px",
color:"#cbd5f5",
marginBottom:"15px"
},

label:{
color:"#94a3b8",
fontSize:"14px"
},

statusRow:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"18px"
},

statusBadge:(status)=>({

padding:"5px 12px",
borderRadius:"20px",
fontSize:"12px",
fontWeight:"600",

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

}),

buttons:{
display:"flex",
gap:"10px"
},

acceptBtn:{
flex:1,
padding:"10px",
border:"none",
borderRadius:"8px",
background:"#22c55e",
color:"white",
cursor:"pointer",
fontWeight:"600"
},

rejectBtn:{
flex:1,
padding:"10px",
border:"none",
borderRadius:"8px",
background:"#ef4444",
color:"white",
cursor:"pointer",
fontWeight:"600"
}

};

export default ViewApplicants;