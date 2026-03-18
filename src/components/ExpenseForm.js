// src/components/ExpenseForm.js
import React, { useState, useEffect } from "react";
import api from "../api";

const CAT_ICONS = {Food:"🍔",Travel:"✈️",Shopping:"🛍️",Education:"📚",Health:"💊",Entertainment:"🎮",Other:"📦"};

export default function ExpenseForm({ expense, categories, onSuccess, onCancel }) {
  const [form, setForm] = useState({title:"",amount:"",category:"Food",description:"",date:new Date().toISOString().split("T")[0]});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>{
    if(expense) setForm({title:expense.title,amount:expense.amount,category:expense.category,description:expense.description||"",date:new Date(expense.date).toISOString().split("T")[0]});
  },[expense]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      if(expense) await api.put(`/expenses/${expense.id}`,form);
      else await api.post("/expenses",form);
      onSuccess();
    } catch(err){ setError(err.response?.data?.error||"Something went wrong."); }
    finally { setLoading(false); }
  };

  const inp = {width:"100%",border:"2px solid #f0f0f0",borderRadius:"12px",padding:"11px 14px",fontSize:"14px",outline:"none",boxSizing:"border-box",background:"#fafafa"};

  return (
    <div style={{background:"white",borderRadius:"20px",padding:"28px",boxShadow:"0 8px 30px rgba(0,0,0,0.1)"}}>
      <h2 style={{fontSize:"18px",fontWeight:"700",color:"#1a1a2e",margin:"0 0 20px"}}>{expense?"✏️ Edit Expense":"➕ Add New Expense"}</h2>
      {error && <div style={{background:"#fff0f0",border:"1px solid #ffcdd2",color:"#c62828",borderRadius:"10px",padding:"10px 14px",fontSize:"13px",marginBottom:"16px"}}>⚠️ {error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
          <div>
            <label style={{fontSize:"12px",fontWeight:"600",color:"#666",display:"block",marginBottom:"6px"}}>TITLE</label>
            <input style={inp} placeholder="e.g. Lunch, Auto fare" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required onFocus={e=>e.target.style.borderColor="#667eea"} onBlur={e=>e.target.style.borderColor="#f0f0f0"}/>
          </div>
          <div>
            <label style={{fontSize:"12px",fontWeight:"600",color:"#666",display:"block",marginBottom:"6px"}}>AMOUNT (₹)</label>
            <input style={inp} type="number" placeholder="0" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} required min="0" onFocus={e=>e.target.style.borderColor="#667eea"} onBlur={e=>e.target.style.borderColor="#f0f0f0"}/>
          </div>
          <div>
            <label style={{fontSize:"12px",fontWeight:"600",color:"#666",display:"block",marginBottom:"6px"}}>CATEGORY</label>
            <select style={{...inp,cursor:"pointer"}} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              {categories.map(c=><option key={c} value={c}>{CAT_ICONS[c]} {c}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:"12px",fontWeight:"600",color:"#666",display:"block",marginBottom:"6px"}}>DATE</label>
            <input style={inp} type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} onFocus={e=>e.target.style.borderColor="#667eea"} onBlur={e=>e.target.style.borderColor="#f0f0f0"}/>
          </div>
          <div style={{gridColumn:"1/-1"}}>
            <label style={{fontSize:"12px",fontWeight:"600",color:"#666",display:"block",marginBottom:"6px"}}>DESCRIPTION (OPTIONAL)</label>
            <input style={inp} placeholder="Any extra details..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} onFocus={e=>e.target.style.borderColor="#667eea"} onBlur={e=>e.target.style.borderColor="#f0f0f0"}/>
          </div>
        </div>
        <div style={{display:"flex",gap:"10px",justifyContent:"flex-end",marginTop:"20px"}}>
          <button type="button" onClick={onCancel} style={{padding:"10px 20px",borderRadius:"10px",border:"2px solid #eee",background:"white",fontSize:"14px",cursor:"pointer",fontWeight:"600",color:"#666"}}>Cancel</button>
          <button type="submit" disabled={loading} style={{padding:"10px 24px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg,#667eea,#764ba2)",color:"white",fontSize:"14px",cursor:"pointer",fontWeight:"600",opacity:loading?0.7:1}}>
            {loading?"Saving...":expense?"Update":"Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
}