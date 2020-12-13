function isOdd(testingNumber: number): boolean {
  return testingNumber % 2 === 1;
}

test("Test isOdd function", () => {
  expect(isOdd(1)).toBe(true);
  expect(isOdd(2)).toBe(false);
});
