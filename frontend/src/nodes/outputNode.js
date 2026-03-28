// nodes/outputNode.js
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Output"
    icon="⬆"
    accentColor="#34d399"
    fields={[
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_'),
        placeholder: 'Output label...',
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.outputType || 'Text',
        options: ['Text', 'Image', 'JSON', 'File'],
      },
    ]}
    inputHandles={[{ id: 'value', label: 'Value' }]}
  />
);
