import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {

const navigate = useNavigate();

const [title,setTitle] = useState("");
const [company,setCompany] = useState("");
const [location,setLocation] = useState("");
const [salary,setSalary] = useState("");
const [description,setDescription] = useState("");

const handlePostJob = async () => {

try{

const token = localStorage.getItem("token");

await axios.post(
"https://hiretrack-backend.onrender.com/api/jobs",
{title,company,location,salary,description},
{
headers:{ Authorization:`Bearer ${token}` }
}
);

alert("Job Posted Successfully!");
navigate("/dashboard");

}catch(error){

console.error(error);
alert("Error posting job");

}

};

return(

<div style={styles.page}>

<div style={styles.container}>

<div style={styles.card}>

<h1 style={styles.heading}>Post a New Job</h1>
<p style={styles.subheading}>
Create an opportunity for candidates
</p>

<input
type="text"
placeholder="Job Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={styles.input}
/>

<input
type="text"
placeholder="Company Name"
value={company}
onChange={(e)=>setCompany(e.target.value)}
style={styles.input}
/>

<input
type="text"
placeholder="Location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
style={styles.input}
/>

<input
type="text"
placeholder="Salary (Optional)"
value={salary}
onChange={(e)=>setSalary(e.target.value)}
style={styles.input}
/>

<textarea
placeholder="Job Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
style={styles.textarea}
/>

<button onClick={handlePostJob} style={styles.button}>
Publish Job
</button>

</div>

</div>

</div>

);

}

const styles={

page:{
minHeight:"100vh",
background:"#0f172a",
padding:"60px 20px",
fontFamily:"Inter, sans-serif"
},

container:{
maxWidth:"800px",
margin:"auto"
},

card:{
background:"#1e293b",
padding:"40px",
borderRadius:"16px",
boxShadow:"0 15px 40px rgba(0,0,0,0.4)",
border:"1px solid rgba(255,255,255,0.05)",
color:"white"
},

heading:{
fontSize:"28px",
fontWeight:"600",
marginBottom:"6px"
},

subheading:{
marginBottom:"28px",
color:"#94a3b8",
fontSize:"14px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid #334155",
background:"#0f172a",
color:"white",
fontSize:"14px",
outline:"none"
},

textarea:{
width:"100%",
padding:"12px",
marginBottom:"20px",
borderRadius:"8px",
border:"1px solid #334155",
background:"#0f172a",
color:"white",
height:"110px",
fontSize:"14px",
outline:"none"
},

button:{
width:"100%",
padding:"14px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(135deg,#6366f1,#7c3aed)",
color:"white",
fontWeight:"600",
fontSize:"15px",
cursor:"pointer"
}

};

export default PostJob;