import * as Core from "@actions/core";
import * as Github from "@actions/github";

export function main(): void {
  // Ensure that this action is running on the Pull Request
  if (Github.context.payload.pull_request == null) {
    Core.setFailed("You can use this action when only Pull-request!");
    return;
  }

  const body = Github.context.payload.pull_request.body;
  console.log("--- Pull request body ---");
  console.log(body);
}
