import { Checkbox, CheckboxState } from "../../src/lib/Checkbox";
import { CheckboxContext } from "../../src/lib/CheckboxContext";

function generateRepeatedCase(state: CheckboxState, times: number): Checkbox[] {
  const generated: Checkbox[] = [];
  for (let i = 0; i < times; i++) {
    generated.push(new Checkbox(state, state + " checkbox"));
  }
  return generated;
}

test("Test the counting is working well", () => {
  const hasAllState: CheckboxContext = new CheckboxContext([
    ...generateRepeatedCase("checked", 3),
    ...generateRepeatedCase("unchecked", 4),
    ...generateRepeatedCase("cancelled", 5),
  ]);

  const onlyChecked: CheckboxContext = new CheckboxContext(
    generateRepeatedCase("checked", 5)
  );

  const onlyUnchecked: CheckboxContext = new CheckboxContext(
    generateRepeatedCase("unchecked", 3)
  );

  const onlyCancelled: CheckboxContext = new CheckboxContext(
    generateRepeatedCase("cancelled", 3)
  );

  expect(hasAllState.checked).toBe(3);
  expect(hasAllState.unchecked).toBe(4);
  expect(hasAllState.cancelled).toBe(5);

  expect(onlyChecked.checked).toBe(5);
  expect(onlyChecked.unchecked).toBe(0);
  expect(onlyChecked.cancelled).toBe(0);

  expect(onlyUnchecked.checked).toBe(0);
  expect(onlyUnchecked.unchecked).toBe(3);
  expect(onlyUnchecked.cancelled).toBe(0);

  expect(onlyCancelled.checked).toBe(0);
  expect(onlyCancelled.unchecked).toBe(0);
  expect(onlyCancelled.cancelled).toBe(3);
});
