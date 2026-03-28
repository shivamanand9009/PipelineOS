// nodes/BaseNode.js
// ─────────────────────────────────────────────────────────────────────────────
// ABSTRACTION: All nodes extend this. Pass in:
//   - id, data          (from ReactFlow)
//   - label             (node title string)
//   - icon              (emoji or SVG string)
//   - accentColor       (CSS color for the left border & glow)
//   - fields            (array of field config objects – see below)
//   - inputHandles      (array of { id, label, style? })
//   - outputHandles     (array of { id, label, style? })
//   - children          (any extra JSX rendered inside the card)
//
// Field config shape:
//   { name, label, type: 'text'|'select'|'textarea'|'number', options?, defaultValue?, onChange? }
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Handle, Position } from "reactflow";

const styles = {
  node: (accentColor) => ({
    background: "linear-gradient(135deg, #0f1623 0%, #1a2235 100%)",
    border: `1px solid ${accentColor}44`,
    borderLeft: `3px solid ${accentColor}`,
    borderRadius: "10px",
    minWidth: "220px",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    boxShadow: `0 0 20px ${accentColor}22, 0 4px 24px #00000088`,
    overflow: "visible",
    position: "relative",
  }),
  header: (accentColor) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px 8px",
    borderBottom: `1px solid ${accentColor}33`,
    background: `linear-gradient(90deg, ${accentColor}18 0%, transparent 100%)`,
    borderRadius: "8px 8px 0 0",
  }),
  icon: {
    fontSize: "16px",
    lineHeight: 1,
  },
  label: (accentColor) => ({
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: accentColor,
  }),
  body: {
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  fieldLabel: {
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#5a6a8a",
    fontWeight: "600",
  },
  input: {
    background: "#0a0f1a",
    border: "1px solid #1e2d45",
    borderRadius: "5px",
    color: "#c8d8f0",
    padding: "5px 8px",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  select: {
    background: "#0a0f1a",
    border: "1px solid #1e2d45",
    borderRadius: "5px",
    color: "#c8d8f0",
    padding: "5px 8px",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  handleWrapper: (side) => ({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    ...(side === "left"
      ? { left: "-8px", flexDirection: "row" }
      : { right: "-8px", flexDirection: "row-reverse" }),
  }),
  handleLabel: (side) => ({
    fontSize: "9px",
    color: "#3a5a8a",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    ...(side === "left" ? { paddingLeft: "16px" } : { paddingRight: "16px" }),
  }),
};

const handleStyle = (accentColor) => ({
  width: "10px",
  height: "10px",
  background: accentColor,
  border: `2px solid #0a0f1a`,
  borderRadius: "50%",
  boxShadow: `0 0 6px ${accentColor}`,
});

export const BaseNode = ({
  id,
  label,
  icon = "⬡",
  accentColor = "#3b82f6",
  fields = [],
  inputHandles = [],
  outputHandles = [],
  children,
  minWidth,
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.name] = f.defaultValue ?? "";
    });
    return init;
  });

  const handleChange = (field, value) => {
    setFieldValues((prev) => ({ ...prev, [field.name]: value }));
    if (field.onChange) field.onChange(value, id);
  };

  return (
    <div style={{ ...styles.node(accentColor), minWidth: minWidth || 220 }}>
      {/* ── Header ── */}
      <div style={styles.header(accentColor)}>
        <span style={styles.icon}>{icon}</span>
        <span style={styles.label(accentColor)}>{label}</span>
      </div>

      {/* ── Body: Fields ── */}
      <div style={styles.body}>
        {fields.map((field) => (
          <div key={field.name} style={styles.field}>
            <span style={styles.fieldLabel}>{field.label}</span>
            {field.type === "select" ? (
              <select
                style={styles.select}
                value={fieldValues[field.name]}
                onChange={(e) => handleChange(field, e.target.value)}
              >
                {(field.options || []).map((opt) => (
                  <option key={opt.value ?? opt} value={opt.value ?? opt}>
                    {opt.label ?? opt}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                style={{
                  ...styles.input,
                  resize: "vertical",
                  minHeight: "60px",
                }}
                value={fieldValues[field.name]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={field.placeholder || ""}
              />
            ) : (
              <input
                type={field.type || "text"}
                style={styles.input}
                value={fieldValues[field.name]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={field.placeholder || ""}
              />
            )}
          </div>
        ))}
        {children}
      </div>

      {/* ── Input Handles (Left) ── */}
      {inputHandles.map((h, i) => {
        const top =
          inputHandles.length === 1
            ? "50%"
            : `${((i + 1) / (inputHandles.length + 1)) * 100}%`;
        return (
          <Handle
            key={h.id}
            type="target"
            position={Position.Left}
            id={`${id}-${h.id}`}
            style={{ ...handleStyle(accentColor), top, ...(h.style || {}) }}
            title={h.label}
          />
        );
      })}

      {/* ── Output Handles (Right) ── */}
      {outputHandles.map((h, i) => {
        const top =
          outputHandles.length === 1
            ? "50%"
            : `${((i + 1) / (outputHandles.length + 1)) * 100}%`;
        return (
          <Handle
            key={h.id}
            type="source"
            position={Position.Right}
            id={`${id}-${h.id}`}
            style={{ ...handleStyle(accentColor), top, ...(h.style || {}) }}
            title={h.label}
          />
        );
      })}
    </div>
  );
};
