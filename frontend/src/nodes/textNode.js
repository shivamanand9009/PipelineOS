// nodes/textNode.js
// Part 3: Auto-resize + dynamic variable handles from {{varName}} syntax

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const ACCENT = '#f59e0b';

const nodeStyle = {
  background: 'linear-gradient(135deg, #0f1623 0%, #1a2235 100%)',
  border: `1px solid ${ACCENT}44`,
  borderLeft: `3px solid ${ACCENT}`,
  borderRadius: '10px',
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  boxShadow: `0 0 20px ${ACCENT}22, 0 4px 24px #00000088`,
  position: 'relative',
  minWidth: '220px',
  boxSizing: 'border-box',
};

const handleDotStyle = {
  width: '10px',
  height: '10px',
  background: ACCENT,
  border: '2px solid #0a0f1a',
  borderRadius: '50%',
  boxShadow: `0 0 6px ${ACCENT}`,
};

// Extract all valid JS identifiers inside {{ }}
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [size, setSize] = useState({ width: 220, height: 'auto' });

  const variables = extractVariables(text);

  // Auto-resize: grow width with long lines, grow height with newlines
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';

    // Estimate width from longest line
    const lines = text.split('\n');
    const longest = Math.max(...lines.map((l) => l.length), 10);
    const newWidth = Math.min(Math.max(220, longest * 8 + 60), 600);
    setSize({ width: newWidth });
  }, [text]);

  return (
    <div style={{ ...nodeStyle, width: size.width }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px 8px',
          borderBottom: `1px solid ${ACCENT}33`,
          background: `linear-gradient(90deg, ${ACCENT}18 0%, transparent 100%)`,
          borderRadius: '8px 8px 0 0',
        }}
      >
        <span>📝</span>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: ACCENT,
          }}
        >
          Text
        </span>
        {variables.length > 0 && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '9px',
              color: '#5a6a8a',
              background: '#0a0f1a',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid #1e2d45',
            }}
          >
            {variables.length} var{variables.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px' }}>
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#5a6a8a',
            fontWeight: '600',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Text Content
        </span>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          style={{
            background: '#0a0f1a',
            border: '1px solid #1e2d45',
            borderRadius: '5px',
            color: '#c8d8f0',
            padding: '6px 8px',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            resize: 'none',
            overflow: 'hidden',
            lineHeight: '1.5',
            transition: 'border-color 0.2s',
            minHeight: '32px',
          }}
          placeholder="Type text or use {{variable}}..."
        />

        {/* Variable chips */}
        {variables.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              marginTop: '6px',
            }}
          >
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: '9px',
                  color: ACCENT,
                  background: `${ACCENT}15`,
                  border: `1px solid ${ACCENT}44`,
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Input Handles — one per variable */}
      {variables.map((v, i) => {
        const top = variables.length === 1
          ? '50%'
          : `${((i + 1) / (variables.length + 1)) * 100}%`;
        return (
          <Handle
            key={v}
            type="target"
            position={Position.Left}
            id={`${id}-${v}`}
            style={{ ...handleDotStyle, top }}
            title={v}
          />
        );
      })}

      {/* Static Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ ...handleDotStyle, top: '50%' }}
        title="Output"
      />
    </div>
  );
};
