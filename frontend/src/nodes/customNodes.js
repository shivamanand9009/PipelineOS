// nodes/customNodes.js
// 5 new nodes, each demonstrating BaseNode abstraction flexibility

import { BaseNode } from './BaseNode';

// ── 1. API Request Node ────────────────────────────────────────────────────
export const ApiNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="API Request"
    icon="🌐"
    accentColor="#0ea5e9"
    fields={[
      {
        name: 'url',
        label: 'Endpoint URL',
        type: 'text',
        defaultValue: data?.url || '',
        placeholder: 'https://api.example.com/...',
      },
      {
        name: 'method',
        label: 'HTTP Method',
        type: 'select',
        defaultValue: data?.method || 'GET',
        options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
      {
        name: 'authType',
        label: 'Auth',
        type: 'select',
        defaultValue: data?.authType || 'None',
        options: ['None', 'Bearer Token', 'API Key', 'Basic Auth'],
      },
    ]}
    inputHandles={[
      { id: 'body', label: 'Request Body' },
      { id: 'headers', label: 'Headers' },
    ]}
    outputHandles={[
      { id: 'response', label: 'Response' },
      { id: 'status', label: 'Status Code' },
    ]}
  />
);

// ── 2. Prompt Template Node ────────────────────────────────────────────────
export const PromptTemplateNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Prompt Template"
    icon="📋"
    accentColor="#ec4899"
    fields={[
      {
        name: 'role',
        label: 'System Role',
        type: 'select',
        defaultValue: data?.role || 'Assistant',
        options: ['Assistant', 'Expert', 'Teacher', 'Analyst', 'Creative Writer', 'Coder'],
      },
      {
        name: 'template',
        label: 'Prompt Template',
        type: 'textarea',
        defaultValue: data?.template || 'You are a {{role}}. Answer: {{question}}',
        placeholder: 'Use {{variable}} syntax...',
      },
      {
        name: 'maxTokens',
        label: 'Max Tokens',
        type: 'number',
        defaultValue: data?.maxTokens || 1024,
      },
    ]}
    inputHandles={[{ id: 'vars', label: 'Variables' }]}
    outputHandles={[{ id: 'prompt', label: 'Formatted Prompt' }]}
  />
);

// ── 3. Data Transform Node ─────────────────────────────────────────────────
export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Transform"
    icon="⚙"
    accentColor="#f97316"
    fields={[
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: data?.operation || 'JSON Parse',
        options: [
          'JSON Parse',
          'JSON Stringify',
          'To Uppercase',
          'To Lowercase',
          'Trim Whitespace',
          'Split Lines',
          'Join Array',
          'Base64 Encode',
          'Base64 Decode',
        ],
      },
      {
        name: 'delimiter',
        label: 'Delimiter (for split/join)',
        type: 'text',
        defaultValue: data?.delimiter || ',',
        placeholder: '\\n or , or |',
      },
    ]}
    inputHandles={[{ id: 'data', label: 'Input Data' }]}
    outputHandles={[{ id: 'result', label: 'Transformed Data' }]}
  />
);

// ── 4. Condition / Router Node ─────────────────────────────────────────────
export const ConditionNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Condition"
    icon="🔀"
    accentColor="#84cc16"
    fields={[
      {
        name: 'field',
        label: 'Field to Check',
        type: 'text',
        defaultValue: data?.field || '',
        placeholder: 'e.g. response.status',
      },
      {
        name: 'operator',
        label: 'Operator',
        type: 'select',
        defaultValue: data?.operator || 'equals',
        options: [
          'equals',
          'not equals',
          'contains',
          'not contains',
          'greater than',
          'less than',
          'is empty',
          'is not empty',
        ],
      },
      {
        name: 'value',
        label: 'Compare Value',
        type: 'text',
        defaultValue: data?.value || '',
        placeholder: 'Expected value...',
      },
    ]}
    inputHandles={[{ id: 'input', label: 'Input' }]}
    outputHandles={[
      { id: 'true', label: 'True' },
      { id: 'false', label: 'False' },
    ]}
  />
);

// ── 5. Memory / Context Node ───────────────────────────────────────────────
export const MemoryNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Memory"
    icon="🧠"
    accentColor="#c084fc"
    fields={[
      {
        name: 'memoryType',
        label: 'Memory Type',
        type: 'select',
        defaultValue: data?.memoryType || 'Buffer',
        options: ['Buffer', 'Summary', 'Vector Store', 'Entity', 'Conversation'],
      },
      {
        name: 'windowSize',
        label: 'Window Size (messages)',
        type: 'number',
        defaultValue: data?.windowSize || 10,
        placeholder: '5 – 50',
      },
      {
        name: 'key',
        label: 'Session Key',
        type: 'text',
        defaultValue: data?.key || 'default',
        placeholder: 'Unique session identifier',
      },
    ]}
    inputHandles={[
      { id: 'input', label: 'New Message' },
      { id: 'clear', label: 'Clear Signal' },
    ]}
    outputHandles={[{ id: 'history', label: 'Chat History' }]}
  />
);
