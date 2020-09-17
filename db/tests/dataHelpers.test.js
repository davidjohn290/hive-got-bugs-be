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
            username: expect.any(String),
            created_at: expect.any(Date),
            name: expect.any(String),
            avatar_url: expect.any(String),
            online_status: expect.any(String),
            bug_points: expect.any(Number),
            bug_points_over_month: expect.any(Number),
            role: expect.any(String),
            description: expect.any(String),
            github_url: expect.any(String),
            skill1: expect.any(String),
            skill2: expect.any(String),
            skill3: expect.any(String),
            skill4: expect.any(String),
          })
        );
      } else {
        expect(user).toEqual(
          expect.objectContaining({
            username: expect.any(String),
            created_at: expect.any(Date),
            name: expect.any(String),
            avatar_url: expect.any(String),
            online_status: expect.any(String),
            bug_points: expect.any(Number),
            bug_points_over_month: expect.any(Number),
            role: expect.any(String),
            description: null,
            github_url: null,
            skill1: null,
            skill2: null,
            skill3: null,
            skill4: null,
          })
        );
        expect(user.description).toBeNull();
        expect(user.github_url).toBeNull();
        expect(user.skill1).toBeNull();
        expect(user.skill2).toBeNull();
        expect(user.skill3).toBeNull();
        expect(user.skill4).toBeNull();
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
          created_at: expect.any(Date),
          username: expect.any(String),
          difficulty: expect.any(Number),
          solved: expect.any(String),
          tech: expect.any(String),
          title: expect.any(String),
          body: expect.any(String),
        })
      );
    });
  });
  test("formats suggestion data", () => {
    const tech = generateTechData(techList);
    const users = generateUserData(5);
    const problems = generateProblemData(10, users, tech);
    const suggestions = generateSuggestionData(5, problems, users);
    suggestions.forEach((suggestion) => {
      expect(suggestion).toEqual(
        expect.objectContaining({
          belongs_to: expect.any(String),
          created_at: expect.any(Date),
          username: expect.any(String),
          body: expect.any(String),
        })
      );
      expect(suggestion).toHaveProperty("approved_by");
    });
  });
});
