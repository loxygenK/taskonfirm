import { CheckboxContext } from "./CheckboxContext";

export function countCheckbox(body: string | undefined): CheckboxContext {
  if(body == null) {
    return {
      checked: 0,
      unchecked: 0,
      ignored: 0
    }
  }

  return {
    checked: 0,
    unchecked: 0,
    ignored: 0
  };
}
