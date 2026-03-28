// nodes/inputNode.js
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Input"
    icon="⬇"
    accentColor="#22d3ee"
    fields={[
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.inputName || id.replace('customInput-', 'input_'),
        placeholder: 'Variable name...',
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.inputType || 'Text',
        options: ['Text', 'File'],
      },
    ]}
    outputHandles={[{ id: 'value', label: 'Value' }]}
  />
);
