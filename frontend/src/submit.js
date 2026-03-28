// submit.js — Part 4: Backend Integration
import { useStore } from "./store";
import { useState } from "react";

export const SubmitButton = () => {
  // ✅ Individual selectors — no shallow needed
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const { num_nodes, num_edges, is_dag } = await response.json();

      alert(
        `━━━━━━ Pipeline Analysis ━━━━━━\n\n` +
          `📦  Nodes     : ${num_nodes}\n` +
          `🔗  Edges     : ${num_edges}\n` +
          `🔁  DAG Check : ${is_dag ? "✅ Valid DAG — no cycles detected" : "❌ Not a DAG — cycle detected!"}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      );
    } catch (err) {
      alert(
        `❌ Failed to reach backend:\n${err.message}\n\nMake sure FastAPI is running on port 8000.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px",
        background: "#080d18",
        borderTop: "1px solid #1a2540",
        height: "60px", // ✅ fixed height so canvas doesn't swallow it
        flexShrink: 0, // ✅ won't get squished by flex parent
      }}
    >
      <button
        onClick={handleSubmit}
        disabled={loading || nodes.length === 0}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 32px",
          background:
            loading || nodes.length === 0
              ? "#1a2235"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          color: loading || nodes.length === 0 ? "#3a5a8a" : "#fff",
          border: "none",
          borderRadius: "8px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: loading || nodes.length === 0 ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          boxShadow:
            loading || nodes.length === 0 ? "none" : "0 0 20px #3b82f644",
        }}
        onMouseEnter={(e) => {
          if (!loading && nodes.length > 0) {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 0 30px #3b82f666";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            loading || nodes.length === 0 ? "none" : "0 0 20px #3b82f644";
        }}
      >
        {loading ? "⟳ Analyzing..." : "▶ Run Pipeline"}
      </button>

      {nodes.length === 0 && (
        <span
          style={{
            marginLeft: "12px",
            fontSize: "10px",
            color: "#3a5a8a",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.05em",
          }}
        >
          Add nodes to the canvas first
        </span>
      )}
    </div>
  );
};
