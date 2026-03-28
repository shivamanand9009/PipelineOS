// draggableNode.js

export const DraggableNode = ({ type, label, icon = '⬡', color = '#3b82f6' }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.6';
    event.target.style.transform = 'scale(0.95)';
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'scale(1)';
      }}
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: '#0a1020',
        border: `1px solid ${color}55`,
        borderRadius: '7px',
        transition: 'all 0.15s ease',
        userSelect: 'none',
        boxShadow: `0 0 10px ${color}18`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 0 14px ${color}44`;
        e.currentTarget.style.background = `${color}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}55`;
        e.currentTarget.style.boxShadow = `0 0 10px ${color}18`;
        e.currentTarget.style.background = '#0a1020';
      }}
    >
      <span style={{ fontSize: '13px' }}>{icon}</span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        fontWeight: '600',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color,
      }}>
        {label}
      </span>
    </div>
  );
};
