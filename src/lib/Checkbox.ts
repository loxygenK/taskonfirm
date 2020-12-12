export class Checkbox {

  static readonly checkboxRegex = /^\s*-\s+\[\s*([\sX])\s*\]\s*(.+?)$/;
  static readonly cancelledBodyRegex = /^\s*~{2}(.*?)~{2}\s*$/

  readonly checked: boolean;
  readonly cancelled: boolean;
  readonly body: string;

  constructor(checked: boolean, cancelled: boolean, body: string) {
    this.checked = checked;
    this.cancelled = cancelled;
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

    return new Checkbox(isChecked, isCancelled, body)
  }

}
