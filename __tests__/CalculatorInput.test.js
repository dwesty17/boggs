import { getRawOperands, getOperators } from "../components/CalculatorInput";

describe("<CalculatorInput />", () => {
  describe("input parsing algorithm", () => {
    describe("getRawOperands()", () => {
      it ("splits the input string into the raw operands", () => {
        expect(getRawOperands("$40+$10/2")).toEqual(["$40", "$10", "2"]);
        expect(getRawOperands("40.34+10.25/2")).toEqual(["40.34", "10.25", "2"]);
        expect(getRawOperands("1+2*6/5+")).toEqual(["1", "2", "6", "5", ""]);
        expect(getRawOperands("10.23.42-45_45")).toEqual(["10.23.42", "45_45"]);
      });
    });

    xdescribe("getOperators()", () => {
      it("splits the input string into operators", () => {
        expect(getOperators("$40+$10/2")).toEqual(["+", "/"]);
        expect(getOperators("40.34+10.25/2")).toEqual(["+", "/"]);
        expect(getOperators("1+2*6/5+")).toEqual(["+", "*", "/", "+"]);
        expect(getOperators("10.23.42-45_45")).toEqual(["-"]);
      });
    });
  });
});
