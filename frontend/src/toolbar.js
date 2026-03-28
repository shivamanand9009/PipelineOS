// toolbar.js
import { DraggableNode } from './draggableNode';

const nodes = [
  { type: 'customInput',    label: 'Input',      icon: '⬇', color: '#22d3ee' },
  { type: 'customOutput',   label: 'Output',     icon: '⬆', color: '#34d399' },
  { type: 'llm',            label: 'LLM',        icon: '🤖', color: '#a855f7' },
  { type: 'text',           label: 'Text',       icon: '📝', color: '#f59e0b' },
  { type: 'api',            label: 'API',        icon: '🌐', color: '#0ea5e9' },
  { type: 'promptTemplate', label: 'Prompt',     icon: '📋', color: '#ec4899' },
  { type: 'transform',      label: 'Transform',  icon: '⚙',  color: '#f97316' },
  { type: 'condition',      label: 'Condition',  icon: '🔀', color: '#84cc16' },
  { type: 'memory',         label: 'Memory',     icon: '🧠', color: '#c084fc' },
];

export const PipelineToolbar = () => (
  <div
    style={{
      background: 'linear-gradient(180deg, #0a0f1a 0%, #0d1424 100%)',
      borderBottom: '1px solid #1a2540',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }}
  >
    {/* Brand */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px' }}>
      <div style={{
        width: '28px', height: '28px',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        borderRadius: '6px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px',
      }}>⬡</div>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
        fontWeight: '700',
        color: '#c8d8f0',
        letterSpacing: '0.08em',
      }}>PipelineOS</span>
    </div>

    <div style={{ width: '1px', height: '32px', background: '#1a2540' }} />

    {/* Node palette */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {nodes.map((n) => (
        <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} color={n.color} />
      ))}
    </div>
  </div>
);
