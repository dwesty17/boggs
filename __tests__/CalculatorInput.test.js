import {
  buildOperation,
  areOperandsValid,
  getRawOperands,
  getOperators,
  reduceOperation,
  constructNewInputValue,
} from "../components/CalculatorInput";

describe("<CalculatorInput />", () => {
  describe("input parsing helpers", () => {
    describe("buildOperation()", () => {
      it("returns an operation object for valid input strings", () => {
        expect(buildOperation("$43.00+21.03-2.03*5/4+")).toEqual({
          operands: [43, 21.03, 2.03, 5, 4],
          operators: ["+", "-", "*", "/", "+"],
        });
      });

      it("returns false for invalid input strings", () => {
        expect(buildOperation("$43.09+340-7..34/2")).toBe(false);
      });
    });

    describe("getRawOperands()", () => {
      it ("splits the input string into the raw operands", () => {
        expect(getRawOperands("$40+$10/2")).toEqual(["40", "10", "2"]);
        expect(getRawOperands("$40.34+10.25/2")).toEqual(["40.34", "10.25", "2"]);
        expect(getRawOperands("1+2*6/5+")).toEqual(["1", "2", "6", "5", ""]);
        expect(getRawOperands("10.23.42-45_45")).toEqual(["10.23.42", "45_45"]);
      });
    });

    describe("getOperators()", () => {
      it("splits the input string into operators", () => {
        expect(getOperators("$40+$10/2")).toEqual(["+", "/"]);
        expect(getOperators("40.34+10.25/2")).toEqual(["+", "/"]);
        expect(getOperators("1+2*6/5+")).toEqual(["+", "*", "/", "+"]);
        expect(getOperators("10.23.42-45_45")).toEqual(["-"]);
      });
    });

    describe("areOperandsValid()", () => {
      it("indicates whether and array of operators are valid or not", () => {
        expect(areOperandsValid(["40.34", "25", "10.10"])).toBe(true);
        expect(areOperandsValid(["11.0923", "10."])).toBe(true);

        expect(areOperandsValid(["10", "340..34"])).toBe(false);
        expect(areOperandsValid(["2940.34.34", "58", "2"])).toBe(false);
        expect(areOperandsValid(["40_34"])).toBe(false);
      });
    });

    describe("reduceOperation()", () => {
      it("leaves an operation with two or less operands unchanged", () => {
        const operation1 = buildOperation("$45.10");
        expect(reduceOperation(operation1)).toEqual({
          operands: [ 45.1 ],
          operators: [],
        });

        const operation2 = buildOperation("23+");
        expect(reduceOperation(operation2)).toEqual({
          operands: [ 23 ],
          operators: [ "+" ],
        });

        const operation3 = buildOperation("1.02-3.00");
        expect(reduceOperation(operation3)).toEqual({
          operands: [ 1.02, 3 ],
          operators: [ "-" ],
        });
      });

      it("reduces an operation that ends in an operand to two operands", () => {

      });

      it("reduces an operation that ends in an operator to one operand", () => {

      });
    });

    describe("constructNewInputValue()", () => {

    });
  });
});
