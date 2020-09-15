const {
  techList,
  generateTechData,
  generateUserData,
  generateProblemData,
  generateSuggestionData,
} = require("../utils/dataHelpers");

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
  test("User data", () => {
    const users = generateUserData(5);
    users.forEach((user) => {
      if (user.role === "mentor") {
        expect(user).toEqual(
          expect.objectContaining({
            created_at: expect.any(Date),
            name: expect.any(String),
            username: expect.any(String),
            avatar_url: expect.any(String),
            online_status: expect.any(String),
            role: expect.any(String),
            bug_points: expect.any(Number),
            bug_points_over_month: expect.any(Number),
            github_url: expect.any(String),
            description: expect.any(String),
            skill1: expect.any(String),
            skill2: expect.any(String),
            skill3: expect.any(String),
            skill4: expect.any(String),
          })
        );
      } else {
        expect(user).toEqual(
          expect.objectContaining({
            created_at: expect.any(Date),
            name: expect.any(String),
            username: expect.any(String),
            avatar_url: expect.any(String),
            online_status: expect.any(String),
            role: expect.any(String),
            bug_points: expect.any(Number),
            bug_points_over_month: expect.any(Number),
          })
        );
      }
    });
  });
  test("formats problem data", () => {
    const tech = generateTechData(techList);
    const users = generateUserData(5);
    const problems = generateProblemData(10, users, tech);
    problems.forEach((problem) => {
      expect(problem).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          username: expect.any(String),
          body: expect.any(String),
          difficulty: expect.any(Number),
          solved: expect.any(String),
          tech: expect.any(String),
          created_at: expect.any(Date),
        })
      );
    });
  });
  test("formats suggestion data", () => {
    const tech = generateTechData(techList);
    const users = generateUserData(5);
    const problems = generateProblemData(10, users, tech);
    const suggestions = generateSuggestionData(5, problems, users);
    suggestions.forEach((problem) => {
      expect(problem).toEqual(
        expect.objectContaining({
          belongsTo: expect.any(String),
          username: expect.any(String),
          body: expect.any(String),
          approved: expect.any(String),
          created_at: expect.any(Date),
        })
      );
    });
  });
});
