import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="LLM"
    icon="🤖"
    accentColor="#a855f7"
    fields={[
      {
        name: "model",
        label: "Model",
        type: "select",
        defaultValue: data?.model || "gpt-4o",
        options: [
          "gpt-4o",
          "gpt-4-turbo",
          "gpt-3.5-turbo",
          "claude-3-opus",
          "gemini-pro",
        ],
      },
      {
        name: "temperature",
        label: "Temperature",
        type: "number",
        defaultValue: data?.temperature ?? 0.7,
        placeholder: "0.0 – 2.0",
      },
    ]}
    inputHandles={[
      { id: "system", label: "System Prompt" },
      { id: "prompt", label: "User Prompt" },
    ]}
    outputHandles={[{ id: "response", label: "Response" }]}
  />
);
