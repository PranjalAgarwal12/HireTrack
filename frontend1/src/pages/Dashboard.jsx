import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Dashboard() {

const navigate = useNavigate();
const token = localStorage.getItem("token");

if(!token){
navigate("/");
return null;
}

const decoded = jwtDecode(token);
const role = decoded.role;

const handleLogout = ()=>{
localStorage.removeItem("token");
navigate("/");
};

return(

<div style={styles.page}>

<div style={styles.container}>

<div style={styles.header}>

<h2 style={styles.title}>HireTrack Dashboard</h2>

<button style={styles.logout} onClick={handleLogout}>
Logout
</button>

</div>

<p style={styles.roleText}>
Logged in as <b>{role}</b>
</p>

<div style={styles.grid}>

{role==="recruiter" && (

<>
<div style={styles.card} onClick={()=>navigate("/post-job")}>
<h3 style={styles.cardTitle}>Post Job</h3>
<p style={styles.cardDesc}>Create and publish a new job listing</p>
</div>

<div style={styles.card} onClick={()=>navigate("/my-jobs")}>
<h3 style={styles.cardTitle}>Manage Jobs</h3>
<p style={styles.cardDesc}>View applicants and manage postings</p>
</div>
</>

)}

{role==="candidate" && (

<>
<div style={styles.card} onClick={()=>navigate("/view-jobs")}>
<h3 style={styles.cardTitle}>Browse Jobs</h3>
<p style={styles.cardDesc}>Explore opportunities from recruiters</p>
</div>

<div style={styles.card} onClick={()=>navigate("/my-applications")}>
<h3 style={styles.cardTitle}>My Applications</h3>
<p style={styles.cardDesc}>Track the status of your applications</p>
</div>
</>

)}

</div>

</div>

</div>

);

}

const styles={

page:{
minHeight:"100vh",
background:"#0f172a",
fontFamily:"Inter, sans-serif",
padding:"60px 20px"
},

container:{
maxWidth:"1100px",
margin:"auto"
},

header:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px"
},

title:{
fontSize:"30px",
fontWeight:"600",
color:"white"
},

roleText:{
marginBottom:"40px",
fontSize:"15px",
color:"#94a3b8"
},

logout:{
background:"#ef4444",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"600"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"28px"
},

card:{
background:"#1e293b",
padding:"30px",
borderRadius:"14px",
cursor:"pointer",
boxShadow:"0 10px 25px rgba(0,0,0,0.35)",
border:"1px solid rgba(255,255,255,0.05)",
transition:"all 0.25s ease"
},

cardTitle:{
fontSize:"20px",
marginBottom:"8px",
color:"white"
},

cardDesc:{
fontSize:"14px",
color:"#cbd5f5",
lineHeight:"1.5"
}

};

export default Dashboard;