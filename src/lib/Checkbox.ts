export type CheckboxState = "checked" | "unchecked" | "cancelled";

export class Checkbox {

  static readonly checkboxRegex = /^\s*-\s+\[\s*([\sX])\s*\]\s*(.+?)$/;
  static readonly cancelledBodyRegex = /^\s*~{2}(.*?)~{2}\s*$/

  readonly state: CheckboxState;
  readonly body: string;

  constructor(state: CheckboxState, body: string) {
    this.state = state;
    this.body = body;
  }

  static parseLine(line: string): Checkbox | undefined {
    // Verify this is a checkbox
    const checkboxMatch = line.match(this.checkboxRegex);
    if(checkboxMatch  == null) return undefined;

    // extract elements from the text
    const isChecked = checkboxMatch[1] === "X";
    const rawBody = checkboxMatch[2];

    // Check this is cancelled or not
    const cancelMatch = rawBody.match(this.cancelledBodyRegex);
    const isCancelled = cancelMatch != null;

    // Extract body
    const body = (cancelMatch != null ? cancelMatch[1] : rawBody);

    const state: CheckboxState = (
      isCancelled
        ? "cancelled"
        : (isChecked ? "checked" : "unchecked")
    );

    // Always "checked" is false if the checkbox is cancelled.
    return new Checkbox(state, body);
  }

}
