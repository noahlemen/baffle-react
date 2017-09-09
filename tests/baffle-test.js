import expect from "expect";
import baffle from "baffle";
import wrappedBaffle from "src/baffle";

describe("baffle wrapper", () => {
  it("exports baffle", () => {
    expect(wrappedBaffle).toEqual(baffle);
  });
});
