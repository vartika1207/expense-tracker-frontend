import React, { useState } from "react";
import api from "../api";

export default function AIInsights() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const getInsights = async () => {
    setLoading(true);
    try {
      const res = await api.get("/ai/insights");
      setInsight(res.data.insight);
    } catch (err) {
      setInsight("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "white", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", marginBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <p style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 4px" }}>🤖 AI Spending Insights</p>
          <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>Get personalized money-saving tips</p>
        </div>
        <button onClick={getInsights} disabled={loading}
          style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Analyzing..." : "Get AI Insights"}
        </button>
      </div>

      {insight && (
        <div style={{ background: "#f8f9ff", borderRadius: "12px", padding: "16px", borderLeft: "4px solid #667eea" }}>
          <p style={{ fontSize: "14px", color: "#444", margin: 0, lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{insight}</p>
        </div>
      )}
    </div>
  );
}