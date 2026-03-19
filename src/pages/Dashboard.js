// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import AIInsights from "../components/AIInsights";

const CATEGORIES = ["Food","Travel","Shopping","Education","Health","Entertainment","Other"];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [filters, setFilters] = useState({category:"",search:""});
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const params = {};
      if(filters.category) params.category=filters.category;
      if(filters.search) params.search=filters.search;
      const [expRes,sumRes] = await Promise.all([api.get("/expenses",{params}),api.get("/expenses/summary")]);
      setExpenses(expRes.data.expenses); setTotal(expRes.data.total); setSummary(sumRes.data.summary);
    } catch(err){console.error(err);} finally{setLoading(false);}
  };

  useEffect(()=>{fetchExpenses();},[filters]);

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this expense?")) return;
    try{await api.delete(`/expenses/${id}`);fetchExpenses();}
    catch{alert("Could not delete.");}
  };

  const initials = user?.name?.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2)||"U";

  return (
    <div style={{minHeight:"100vh",background:"#f8f9ff"}}>
      <nav style={{background:"white",borderBottom:"1px solid #f0f0f0",padding:"0 24px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",height:"64px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>💰</div>
            <span style={{fontSize:"18px",fontWeight:"700",color:"#1a1a2e"}}>Expense Tracker</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"13px",fontWeight:"700"}}>{initials}</div>
            <span style={{fontSize:"14px",color:"#555",fontWeight:"500"}}>Hello, {user?.name}!</span>
            <button onClick={logout} style={{fontSize:"13px",color:"#e53935",background:"#ffebee",border:"none",padding:"7px 14px",borderRadius:"8px",cursor:"pointer",fontWeight:"600"}}>Logout</button>
          </div>
        </div>
      </nav>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"28px 24px"}}>
        <div style={{marginBottom:"24px"}}>
          <h1 style={{fontSize:"24px",fontWeight:"700",color:"#1a1a2e",margin:"0 0 4px"}}>My Expenses</h1>
          <p style={{fontSize:"14px",color:"#888",margin:0}}>Track and manage all your spending</p>
        </div>
        <div style={{marginBottom:"24px"}}><SummaryCards total={total} summary={summary} expenses={expenses}/></div>
        <AIInsights/>
        <Charts summary={summary} expenses={expenses}/>
        <div style={{background:"white",borderRadius:"16px",padding:"16px 20px",marginBottom:"20px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap",justifyContent:"space-between"}}>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <input type="text" placeholder="🔍  Search..." value={filters.search} onChange={e=>setFilters({...filters,search:e.target.value})}
              style={{border:"2px solid #f0f0f0",borderRadius:"10px",padding:"9px 14px",fontSize:"13px",outline:"none",width:"180px"}}
              onFocus={e=>e.target.style.borderColor="#667eea"} onBlur={e=>e.target.style.borderColor="#f0f0f0"}/>
            <select value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}
              style={{border:"2px solid #f0f0f0",borderRadius:"10px",padding:"9px 14px",fontSize:"13px",outline:"none",cursor:"pointer"}}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={()=>{setEditExpense(null);setShowForm(true);}}
            style={{background:"linear-gradient(135deg,#667eea,#764ba2)",color:"white",border:"none",borderRadius:"10px",padding:"10px 20px",fontSize:"14px",fontWeight:"600",cursor:"pointer"}}>
            + Add Expense
          </button>
        </div>
        {(showForm||editExpense) && (
          <div style={{marginBottom:"20px"}}>
            <ExpenseForm expense={editExpense} categories={CATEGORIES}
              onSuccess={()=>{setShowForm(false);setEditExpense(null);fetchExpenses();}}
              onCancel={()=>{setShowForm(false);setEditExpense(null);}}/>
          </div>
        )}
        {loading ? <div style={{textAlign:"center",padding:"60px",color:"#aaa"}}>Loading...</div>
          : <ExpenseList expenses={expenses} onEdit={e=>{setEditExpense(e);setShowForm(false);}} onDelete={handleDelete}/>}
      </div>
    </div>
  );
}
