import {
  areOperandsValid,
  getRawOperands,
  getOperators
} from "../components/CalculatorInput";

describe("<CalculatorInput />", () => {
  describe("input parsing helpers", () => {
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
      it("splits the input string into operators", () => {
        expect(areOperandsValid(["40.34", "25", "10.10"])).toBe(true);
        expect(areOperandsValid(["10", "340..34"])).toBe(false);
        expect(areOperandsValid(["2940.34.34", "58", "2"])).toBe(false);
        expect(areOperandsValid(["40_34"])).toBe(false);
      });
    });
  });
});
