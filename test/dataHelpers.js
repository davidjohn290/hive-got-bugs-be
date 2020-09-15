const {
  techList,
  generateTechData,
  generateUserData,
  generateProblemData,
  generateSuggestionData,
} = require("../utils/generateDevData");

describe("generateDevData.js", () => {
  test("formats tech data", () => {
    const tech = generateTechData(techList);
    tech.forEach((pieceOfTech) => {
      expect(pieceOfTech).toEqual(
        expect.objectContaining({
          slug: expect.any(String),
        })
      );
    });
  });
});
