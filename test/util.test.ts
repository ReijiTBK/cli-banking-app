import { parsedProperNumber, initCapString } from "../src/utililities/util";

describe("Util Class", () => {
  describe("parsedProperNumber", () => {
    it("should parsed valid number string to number", () => {
      let expectedResult = 1999;
      let input: string = `${expectedResult}`;

      let output: number = parsedProperNumber(input);
      expect(output).toBe(expectedResult);
    });

    it("should throw error if the string pass in contains values other than numbers", () => {
      let input: string = "1999d";
      try {
        parsedProperNumber(input);
        expect(1).toBe(2);
      } catch (err) {
        expect(err.message).toBe("Please enter proper numbers");
      }
    });
  });

  describe("initCapString", () => {
    it("should convert string passed in to init cap string", () => {
      let testCases = ["anna", "BANANA", "hAVANA", "Rabbit"];
      let expectedResult = ["Anna", "Banana", "Havana", "Rabbit"];

      for (let i = 0; i < expectedResult.length; i++) {
        let result = initCapString(testCases[i]);
        expect(result).toBe(expectedResult[i]);
      }
      expect.assertions(testCases.length);
    });
  });
});
