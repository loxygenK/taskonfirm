import {Checkbox, ParseError} from "../../src/lib/Checkbox";

describe("Test that the parsing goes well", () => {
  test("check isParsableAsCheckbox working well", () => {
    // these case returns false
    expect(Checkbox.isParsableAsCheckbox("")).toBeFalsy();
    expect(Checkbox.isParsableAsCheckbox("-")).toBeFalsy();
    expect(Checkbox.isParsableAsCheckbox("- hoge")).toBeFalsy();
    expect(Checkbox.isParsableAsCheckbox("- []")).toBeFalsy();
    expect(Checkbox.isParsableAsCheckbox("- [] hoge")).toBeFalsy();
    expect(Checkbox.isParsableAsCheckbox("- [ ]")).toBeFalsy();

    // these case returns true
    expect(Checkbox.isParsableAsCheckbox("- [ ] hoge")).toBeTruthy();
    expect(Checkbox.isParsableAsCheckbox("- [  ] hoge")).toBeTruthy();
    expect(Checkbox.isParsableAsCheckbox("- [X] hoge")).toBeTruthy();

    expect(Checkbox.isParsableAsCheckbox("- [X] ~~hoge~~")).toBeTruthy();
  });
  test("Check parsing works well", () => {
    const uncheckedCase = Checkbox.parseLine("- [ ] this is unchecked");
    const checkedCase = Checkbox.parseLine("- [X] this is checked");
    const cancelledCase = Checkbox.parseLine("- [ ] ~~this is cancelled~~");
    const cancelledAndCheckedCase = Checkbox.parseLine("- [X] ~~this is checked, but cancelled~~");

    expect(() => Checkbox.parseLine("- [] this cannot be parsed")).toThrow(Error);

    expect(uncheckedCase).toBeTruthy();
    expect(uncheckedCase.state).toBe("unchecked");
    expect(uncheckedCase.body).toBe("this is unchecked");

    expect(checkedCase).toBeTruthy();
    expect(checkedCase.state).toBe("checked");
    expect(checkedCase.body).toBe("this is checked");

    expect(cancelledCase).toBeTruthy();
    expect(cancelledCase.state).toBe("cancelled");
    expect(cancelledCase.body).toBe("this is cancelled");

    expect(cancelledAndCheckedCase).toBeTruthy();
    expect(cancelledAndCheckedCase.state).toBe("cancelled");
    expect(cancelledAndCheckedCase.body).toBe("this is checked, but cancelled");
  })
});
