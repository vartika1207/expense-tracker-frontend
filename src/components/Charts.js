import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#667eea", "#f5576c", "#4facfe", "#43e97b", "#fa709a", "#fee140", "#a18cd1"];

export default function Charts({ summary, expenses }) {
  const pieData = Object.entries(summary).map(([name, value]) => ({ name, value }));

  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const total = expenses
      .filter(e => e.date.split("T")[0] === dateStr)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      amount: Math.round(total)
    };
  });

  if (pieData.length === 0) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
      
      {/* Pie Chart */}
      <div style={{ background: "white", borderRadius: "20px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 16px" }}>Spending by Category</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={{ background: "white", borderRadius: "20px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 16px" }}>Last 7 Days Spending</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
            <Bar dataKey="amount" fill="#667eea" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}