import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#667eea 0%,#764ba2 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
      <div style={{background:"white",borderRadius:"24px",padding:"48px 40px",width:"100%",maxWidth:"420px",boxShadow:"0 25px 50px rgba(0,0,0,0.25)"}}>
        <div style={{textAlign:"center",marginBottom:"36px"}}>
          <div style={{width:"64px",height:"64px",background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:"20px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:"28px"}}>💰</div>
          <h1 style={{fontSize:"26px",fontWeight:"700",color:"#1a1a2e",margin:"0 0 8px"}}>Welcome Back</h1>
          <p style={{color:"#888",fontSize:"14px",margin:0}}>Sign in to track your expenses</p>
        </div>
        {error && (
          <div style={{background:"#fff0f0",border:"1px solid #ffcdd2",color:"#c62828",borderRadius:"12px",padding:"12px 16px",fontSize:"13px",marginBottom:"20px"}}>
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:"16px"}}>
            <label style={{display:"block",fontSize:"13px",fontWeight:"600",color:"#444",marginBottom:"8px"}}>Email Address</label>
            <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} required
              style={{width:"100%",border:"2px solid #f0f0f0",borderRadius:"12px",padding:"12px 16px",fontSize:"14px",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor="#667eea"} onBlur={e=>e.target.style.borderColor="#f0f0f0"} />
          </div>
          <div style={{marginBottom:"24px"}}>
            <label style={{display:"block",fontSize:"13px",fontWeight:"600",color:"#444",marginBottom:"8px"}}>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} required
              style={{width:"100%",border:"2px solid #f0f0f0",borderRadius:"12px",padding:"12px 16px",fontSize:"14px",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor="#667eea"} onBlur={e=>e.target.style.borderColor="#f0f0f0"} />
          </div>
          <button type="submit" disabled={loading}
            style={{width:"100%",background:"linear-gradient(135deg,#667eea,#764ba2)",color:"white",border:"none",borderRadius:"12px",padding:"14px",fontSize:"15px",fontWeight:"600",cursor:"pointer",opacity:loading?0.7:1}}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <p style={{textAlign:"center",fontSize:"13px",color:"#888",marginTop:"24px"}}>
          Don't have an account?{" "}
          <Link to="/register" style={{color:"#667eea",fontWeight:"600",textDecoration:"none"}}>Create one free</Link>
        </p>
      </div>
    </div>
  );
}
