import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("candidate");

  const [errors,setErrors] = useState({});

  const validate = () => {

    let newErrors = {};

    if(name.trim().length < 3){
      newErrors.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      newErrors.email = "Enter a valid email address";
    }

    if(password.length < 8){
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {

    if(!validate()) return;

    try{

      const response = await axios.post(
        "https://hiretrack-backend.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role
        }
      );

      alert(response.data.message || "Registration Successful");

      navigate("/");

    }catch(error){

      if(error.response){
        alert(error.response.data.message);
      }else{
        alert("Server not reachable");
      }

    }

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>
          Join HireTrack today
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={styles.input}
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          style={styles.select}
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          onClick={handleRegister}
          style={styles.button}
        >
          Register
        </button>

        <p style={styles.loginText}>
          Already have an account?
        </p>

        <button
          onClick={()=>navigate("/")}
          style={styles.loginButton}
        >
          Login Instead
        </button>

      </div>

    </div>

  );

}

const styles = {

page:{
height:"100vh",
width:"100%",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#0f172a",
fontFamily:"Inter, sans-serif"
},

card:{
width:"360px",
padding:"40px",
borderRadius:"16px",
background:"#1e293b",
boxShadow:"0 20px 50px rgba(0,0,0,0.45)",
border:"1px solid rgba(255,255,255,0.05)",
textAlign:"center",
color:"white"
},

title:{
fontSize:"30px",
marginBottom:"6px",
fontWeight:"600"
},

subtitle:{
marginBottom:"25px",
color:"#94a3b8",
fontSize:"14px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"5px",
borderRadius:"8px",
border:"1px solid #334155",
background:"#0f172a",
color:"white",
fontSize:"14px",
outline:"none"
},

select:{
width:"100%",
padding:"12px",
marginTop:"10px",
marginBottom:"20px",
borderRadius:"8px",
border:"1px solid #334155",
background:"#0f172a",
color:"white",
fontSize:"14px",
outline:"none"
},

button:{
width:"100%",
padding:"12px",
background:"linear-gradient(135deg,#6366f1,#7c3aed)",
border:"none",
borderRadius:"8px",
color:"white",
fontWeight:"600",
fontSize:"15px",
cursor:"pointer"
},

loginText:{
marginTop:"20px",
color:"#94a3b8",
fontSize:"14px"
},

loginButton:{
marginTop:"5px",
background:"none",
border:"none",
color:"#818cf8",
fontWeight:"600",
cursor:"pointer",
fontSize:"15px"
},

error:{
color:"#f87171",
fontSize:"12px",
marginBottom:"10px",
textAlign:"left"
}

};

export default Register;