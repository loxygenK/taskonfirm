import {countCheckbox} from "../../src/lib/CheckboxCounter";

test("Check the parsing from the multiline is working well", () => {
  const singleLine = "- [ ] Test";
  const multiline = "" +
    "- [ ] Not completed task here\n" + 
    "- [ ] another not completed task\n" + 
    "- [ ] this too\n" + 
    "- [X] oh yes this was finished\n" + 
    "- [X] yes this too\n" + 
    "- [ ] ~~ this was cancelled ~~\n" + 
    "- [X] ~~ this was cancelled after I finished the work :< ~~\n";

  const document = "" +
    "# Motivation\n" + 
    "I want to eat some banana.\n" +
    "\n" +
    "# Tasks\n" +
    "- [X] Buy banana\n" +
    "- [X] Confirm the expiration date\n" +
    "- [X] Share with the family\n" +
    "- [ ] Eat (Me)\n" +
    "- [ ] ~~Eat (Father)~~\n" +
    "      Father doesn't like banana.\n" +
    "- [X] Eat (Mother)";

  const parsedSingleLine = countCheckbox(singleLine);
  const parsedMultiLine = countCheckbox(multiline);
  const parsedDocument = countCheckbox(document);

  expect(parsedSingleLine?.checked).toBe(0);
  expect(parsedSingleLine?.unchecked).toBe(1);
  expect(parsedSingleLine?.cancelled).toBe(0);

  expect(parsedMultiLine?.checked).toBe(2);
  expect(parsedMultiLine?.unchecked).toBe(3);
  expect(parsedMultiLine?.cancelled).toBe(2);

  expect(parsedDocument?.checked).toBe(4);
  expect(parsedDocument?.unchecked).toBe(1);
  expect(parsedDocument?.cancelled).toBe(1);

})
