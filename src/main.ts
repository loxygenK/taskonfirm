import * as Core from "@actions/core";
import * as Github from "@actions/github";
import {countCheckbox} from "./lib/CheckboxCounter";

export function main(): void {
  // Ensure that this action is running on the Pull Request
  if (Github.context.payload.pull_request == null) {
    Core.setFailed("You can use this action when only Pull-request!");
    return;
  }

  const body = Github.context.payload.pull_request.body;
  const checkboxContext = countCheckbox(body);

  if(checkboxContext == null) {
    Core.info("No checkbox is found, nothing to care!");
    return
  }

  Core.debug(
    `  Checked: ${checkboxContext.checked} checkbox(es)\n` +
    `UnChecked: ${checkboxContext.unchecked} checkbox(es)\n` +
    `Cancelled: ${checkboxContext.cancelled} checkbox(es)\n`
  );

  if(checkboxContext.unchecked > 0) {
    Core.setFailed(`[!] ${checkboxContext.unchecked} checkbox(s) is **NOT** checked!`);
    return;
  }

  if(checkboxContext.cancelled > 0) {
    Core.info(`${checkboxContext.cancelled} checkbox(es) is cancelled (strikethrought in the text)`);
  }
  Core.info("✨ All checkboxes has been checked!");

}
