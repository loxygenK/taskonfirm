import { Checkbox } from "./Checkbox";

export class CheckboxContext {
  readonly checked: number;
  readonly unchecked: number;
  readonly cancelled: number;

  constructor(checkboxes: Checkbox[]) {
    this.checked = checkboxes.filter((box) => box.state === "checked").length;
    this.unchecked = checkboxes.filter(
      (box) => box.state === "unchecked"
    ).length;
    this.cancelled = checkboxes.filter(
      (box) => box.state === "cancelled"
    ).length;
  }
}
