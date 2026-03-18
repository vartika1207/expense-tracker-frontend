// src/components/ExpenseList.js
import React from "react";

const CAT = {Food:{bg:"#fff3e0",color:"#e65100",icon:"🍔"},Travel:{bg:"#e3f2fd",color:"#1565c0",icon:"✈️"},Shopping:{bg:"#fce4ec",color:"#880e4f",icon:"🛍️"},Education:{bg:"#ede7f6",color:"#4527a0",icon:"📚"},Health:{bg:"#e8f5e9",color:"#2e7d32",icon:"💊"},Entertainment:{bg:"#fffde7",color:"#f57f17",icon:"🎮"},Other:{bg:"#f5f5f5",color:"#424242",icon:"📦"}};

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if(expenses.length===0) return (
    <div style={{background:"white",borderRadius:"20px",padding:"60px 20px",textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>🧾</div>
      <p style={{fontSize:"16px",fontWeight:"600",color:"#666",margin:"0 0 6px"}}>No expenses yet</p>
      <p style={{fontSize:"13px",color:"#aaa",margin:0}}>Click "Add Expense" to get started</p>
    </div>
  );

  return (
    <div style={{background:"white",borderRadius:"20px",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
      <div style={{padding:"18px 24px",borderBottom:"1px solid #f5f5f5",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{fontSize:"16px",fontWeight:"700",color:"#1a1a2e",margin:0}}>All Expenses</h2>
        <span style={{fontSize:"12px",color:"#aaa",background:"#f5f5f5",padding:"4px 10px",borderRadius:"20px"}}>{expenses.length} records</span>
      </div>
      {expenses.map((e,i)=>{
        const s = CAT[e.category]||CAT.Other;
        return (
          <div key={e.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 24px",borderBottom:i<expenses.length-1?"1px solid #fafafa":"none"}}
            onMouseEnter={el=>el.currentTarget.style.background="#fafafa"} onMouseLeave={el=>el.currentTarget.style.background="white"}>
            <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
              <div style={{width:"42px",height:"42px",background:s.bg,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>{s.icon}</div>
              <div>
                <p style={{fontSize:"14px",fontWeight:"600",color:"#1a1a2e",margin:"0 0 3px"}}>{e.title}</p>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"11px",fontWeight:"600",color:s.color,background:s.bg,padding:"2px 8px",borderRadius:"6px"}}>{e.category}</span>
                  <span style={{fontSize:"11px",color:"#bbb"}}>{new Date(e.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <span style={{fontSize:"16px",fontWeight:"700",color:"#1a1a2e"}}>₹{e.amount.toLocaleString("en-IN")}</span>
              <button onClick={()=>onEdit(e)} style={{fontSize:"12px",color:"#667eea",background:"#667eea15",border:"none",padding:"5px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"600"}}>Edit</button>
              <button onClick={()=>onDelete(e.id)} style={{fontSize:"12px",color:"#e53935",background:"#e5393515",border:"none",padding:"5px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"600"}}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}