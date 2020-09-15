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
        const user = generateUserData(5);
        user.forEach((u) => {
            expect(u).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    username: expect.any(String),
                    avatar_url: expect.any(String),
                    online_status: expect.any(String),
                    role: expect.any(String),
                    bug_points: expect.any(Number),
                    bug_points_over_month: expect.any(Number),
                    //TODO - description and skills 1 - 4
                    //github_url: expect.any(),
                    //description: expect(expect.any(String) || null),
                })
            );
        });
    });
});