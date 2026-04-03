declare module "framer" {
  export const ControlType: {
    Boolean: "boolean";
    String: "string";
    Color: "color";
    Number: "number";
    Enum: "enum";
    Array: "array";
    Object: "object";
    ComponentInstance: "componentinstance";
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function addPropertyControls(
    component: any,
    controls: Record<string, unknown>
  ): void;
}
