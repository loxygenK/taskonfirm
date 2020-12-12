import * as Core from "@actions/core";
import * as Github from "@actions/github";

function main() {
  // Ensure that this action is running on the Pull Request
  if(Github.context.payload.pull_request == null) {
    Core.setFailed("You can use this action when only Pull-request!")
    return
  }

  console.log(Github.context.payload.pull_request.body)
}

main()
