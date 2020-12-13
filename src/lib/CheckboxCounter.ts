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

  lines.forEach((line) => {
    if(Checkbox.isParsableAsCheckbox(line)) {
      const checkbox = Checkbox.parseLine(line);
      console.log(`${line}\n  ${checkbox.state} (${checkbox.body})`);
    } else {
      console.log(`${line}\n  -- not parsable --)`);
    }
  });

  return new CheckboxContext(checkboxes);
}
