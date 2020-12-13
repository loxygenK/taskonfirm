export type CheckboxState = "checked" | "unchecked" | "cancelled";

export class ParseError extends Error {
  constructor(text: string) {
    super(`Cannot parse the text: ${text}`);
  }
}

export class Checkbox {
  static readonly checkboxRegex = /^\s*-\s+\[\s*([\sxX])\s*\]\s*(.+?)\n?$/m;
  static readonly cancelledBodyRegex = /^\s*~{2}(.*?)~{2}\s*$/;

  readonly state: CheckboxState;
  readonly body: string;

  constructor(state: CheckboxState, body: string) {
    this.state = state;
    this.body = body;
  }

  static isParsableAsCheckbox(line: string): boolean {
    return line.match(this.checkboxRegex) != null;
  }

  static parseLine(line: string): Checkbox {
    // Verify this is a checkbox
    const checkboxMatch = line.match(this.checkboxRegex);
    if (checkboxMatch == null) throw new ParseError(line);

    // extract elements from the text
    const isChecked = checkboxMatch[1] !== " ";
    const rawBody = checkboxMatch[2];

    // Check this is cancelled or not
    const cancelMatch = rawBody.match(this.cancelledBodyRegex);
    const isCancelled = cancelMatch != null;

    // Extract body
    const body = cancelMatch != null ? cancelMatch[1] : rawBody;

    const state: CheckboxState = isCancelled
      ? "cancelled"
      : isChecked
      ? "checked"
      : "unchecked";

    // Always "checked" is false if the checkbox is cancelled.
    return new Checkbox(state, body);
  }
}
