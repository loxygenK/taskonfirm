import { Checkbox } from "./Checkbox";
import { CheckboxContext } from "./CheckboxContext";

export function countCheckbox(
  body: string | undefined
): CheckboxContext | undefined {
  if (body == null) {
    return undefined;
  }

  const lines = body.split("\n");
  const checkboxes = lines
    .filter((line) => Checkbox.isParsableAsCheckbox(line))
    .map((line) => Checkbox.parseLine(line));

  return new CheckboxContext(checkboxes);
}
