import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [errors,setErrors] = useState({});

  const validate = () => {

    let newErrors = {};

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

  const handleLogin = async () => {

    if(!validate()) return;

    try{

      const response = await axios.post(
        "https://hiretrack-backend.onrender.com/api/auth/login",
        {email,password}
      );

      localStorage.setItem("token",response.data.token);

      navigate("/dashboard");

    }catch(error){

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  return(

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.logo}>
          HireTrack
        </h1>

        <p style={styles.subtitle}>
          Smart Hiring Platform
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          Login
        </button>

        <p style={styles.registerText}>
          New user?
          <span
            style={styles.link}
            onClick={()=>navigate("/register")}
          >
            Register
          </span>
        </p>

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
background:
"radial-gradient(circle at 20% 20%, #1e3a8a, transparent 40%), radial-gradient(circle at 80% 80%, #7c3aed, transparent 40%), #0f172a",
fontFamily:"Inter, sans-serif"
},

card:{
width:"400px",
padding:"40px",
background:"rgba(30,41,59,0.85)",
borderRadius:"16px",
backdropFilter:"blur(12px)",
border:"1px solid rgba(255,255,255,0.08)",
boxShadow:"0 30px 80px rgba(0,0,0,0.5)",
textAlign:"center",
color:"white"
},

logo:{
fontSize:"32px",
fontWeight:"700",
marginBottom:"6px"
},

subtitle:{
marginBottom:"30px",
color:"#cbd5f5",
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
outline:"none",
fontSize:"14px"
},

button:{
width:"100%",
padding:"12px",
border:"none",
borderRadius:"8px",
background:"linear-gradient(135deg,#6366f1,#7c3aed)",
color:"white",
fontWeight:"600",
cursor:"pointer",
marginTop:"10px"
},

registerText:{
marginTop:"20px",
fontSize:"14px",
color:"#cbd5f5"
},

link:{
marginLeft:"6px",
color:"#818cf8",
cursor:"pointer",
fontWeight:"600"
},

error:{
color:"#f87171",
fontSize:"12px",
marginBottom:"10px",
textAlign:"left"
}

};

export default Login;