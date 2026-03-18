// src/components/SummaryCards.js
import React from "react";

export default function SummaryCards({ total, summary, expenses }) {
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date), now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = thisMonth.reduce((s, e) => s + e.amount, 0);
  const topCategory = Object.entries(summary).sort((a, b) => b[1] - a[1])[0];

  const cards = [
    { label:"Total Spent", value:`₹${total.toLocaleString("en-IN")}`, sub:`${expenses.length} transactions`, icon:"💸", color:"#667eea" },
    { label:"This Month", value:`₹${monthTotal.toLocaleString("en-IN")}`, sub:`${thisMonth.length} transactions`, icon:"📅", color:"#f5576c" },
    { label:"Top Category", value:topCategory?topCategory[0]:"None", sub:topCategory?`₹${topCategory[1].toLocaleString("en-IN")} spent`:"No data yet", icon:"🏆", color:"#4facfe" },
  ];

  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"16px",marginBottom:"8px"}}>
      {cards.map((c,i)=>(
        <div key={i} style={{background:"white",borderRadius:"20px",padding:"24px",boxShadow:"0 4px 20px rgba(0,0,0,0.07)",borderTop:`4px solid ${c.color}`}}>
          <div style={{fontSize:"28px",marginBottom:"10px"}}>{c.icon}</div>
          <p style={{fontSize:"12px",fontWeight:"600",color:"#999",textTransform:"uppercase",letterSpacing:"0.5px",margin:"0 0 6px"}}>{c.label}</p>
          <p style={{fontSize:"22px",fontWeight:"700",color:"#1a1a2e",margin:"0 0 4px"}}>{c.value}</p>
          <p style={{fontSize:"12px",color:"#aaa",margin:0}}>{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
