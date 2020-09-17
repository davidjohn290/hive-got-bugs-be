const { formatBooleans } = require("../utils/modelsHelpers");

describe("formatBooleans", () => {
  test("returns an empty array when passed an empty array", () => {
    expect(formatBooleans([])).toEqual([]);
  });
  test("formats a single-object array", () => {
    const problem0 = [
      {
        created_at: "2020-02-03T16:50:19.450Z",
        username: "Cary_Rutherford83",
        difficulty: 0,
        solved: "true",
        tech: "Java",
        title: "aut a vel",
        body: "Voluptatem velit.",
      },
    ];
    const problem1 = [
      {
        created_at: "2020-03-15T12:57:17.250Z",
        username: "Cary_Rutherford83",
        difficulty: 1,
        solved: "false",
        tech: "C#.net",
        title: "molestiae quae non",
        body: "Cum dolores.",
      },
    ];
    expect(formatBooleans(problem0)).toEqual([
      {
        created_at: "2020-02-03T16:50:19.450Z",
        username: "Cary_Rutherford83",
        difficulty: 0,
        solved: true,
        tech: "Java",
        title: "aut a vel",
        body: "Voluptatem velit.",
      },
    ]);
    expect(formatBooleans(problem1)).toEqual([
      {
        created_at: "2020-03-15T12:57:17.250Z",
        username: "Cary_Rutherford83",
        difficulty: 1,
        solved: false,
        tech: "C#.net",
        title: "molestiae quae non",
        body: "Cum dolores.",
      },
    ]);
  });
  test("formats a multi-object array", () => {
    const problems = [
      {
        created_at: "2020-02-03T16:50:19.450Z",
        username: "Cary_Rutherford83",
        difficulty: 0,
        solved: "true",
        tech: "Java",
        title: "aut a vel",
        body: "Voluptatem velit.",
      },
      {
        created_at: "2020-06-03T18:06:28.447Z",
        username: "Maeve_Orn74",
        difficulty: 1,
        solved: "true",
        tech: "Java",
        title: "hic exercitationem non",
        body: "Labore dolore.",
      },
      {
        created_at: "2020-03-15T12:57:17.250Z",
        username: "Cary_Rutherford83",
        difficulty: 1,
        solved: "false",
        tech: "C#.net",
        title: "molestiae quae non",
        body: "Cum dolores.",
      },
    ];
    expect(formatBooleans(problems)).toEqual([
      {
        created_at: "2020-02-03T16:50:19.450Z",
        username: "Cary_Rutherford83",
        difficulty: 0,
        solved: true,
        tech: "Java",
        title: "aut a vel",
        body: "Voluptatem velit.",
      },
      {
        created_at: "2020-06-03T18:06:28.447Z",
        username: "Maeve_Orn74",
        difficulty: 1,
        solved: true,
        tech: "Java",
        title: "hic exercitationem non",
        body: "Labore dolore.",
      },
      {
        created_at: "2020-03-15T12:57:17.250Z",
        username: "Cary_Rutherford83",
        difficulty: 1,
        solved: false,
        tech: "C#.net",
        title: "molestiae quae non",
        body: "Cum dolores.",
      },
    ]);
  });
  test("input is not mutated", () => {
    const problems = [
      {
        created_at: "2020-02-03T16:50:19.450Z",
        username: "Cary_Rutherford83",
        difficulty: 0,
        solved: "true",
        tech: "Java",
        title: "aut a vel",
        body: "Voluptatem velit.",
      },
      {
        created_at: "2020-06-03T18:06:28.447Z",
        username: "Maeve_Orn74",
        difficulty: 1,
        solved: "true",
        tech: "Java",
        title: "hic exercitationem non",
        body: "Labore dolore.",
      },
      {
        created_at: "2020-03-15T12:57:17.250Z",
        username: "Cary_Rutherford83",
        difficulty: 1,
        solved: "false",
        tech: "C#.net",
        title: "molestiae quae non",
        body: "Cum dolores.",
      },
    ];
    formatBooleans(problems);
    expect(problems).toEqual([
      {
        created_at: "2020-02-03T16:50:19.450Z",
        username: "Cary_Rutherford83",
        difficulty: 0,
        solved: "true",
        tech: "Java",
        title: "aut a vel",
        body: "Voluptatem velit.",
      },
      {
        created_at: "2020-06-03T18:06:28.447Z",
        username: "Maeve_Orn74",
        difficulty: 1,
        solved: "true",
        tech: "Java",
        title: "hic exercitationem non",
        body: "Labore dolore.",
      },
      {
        created_at: "2020-03-15T12:57:17.250Z",
        username: "Cary_Rutherford83",
        difficulty: 1,
        solved: "false",
        tech: "C#.net",
        title: "molestiae quae non",
        body: "Cum dolores.",
      },
    ]);
  });
  test("returned array and objects have new references", () => {
    const problems = [
      {
        created_at: "2020-02-03T16:50:19.450Z",
        username: "Cary_Rutherford83",
        difficulty: 0,
        solved: "true",
        tech: "Java",
        title: "aut a vel",
        body: "Voluptatem velit.",
      },
      {
        created_at: "2020-06-03T18:06:28.447Z",
        username: "Maeve_Orn74",
        difficulty: 1,
        solved: "true",
        tech: "Java",
        title: "hic exercitationem non",
        body: "Labore dolore.",
      },
      {
        created_at: "2020-03-15T12:57:17.250Z",
        username: "Cary_Rutherford83",
        difficulty: 1,
        solved: "false",
        tech: "C#.net",
        title: "molestiae quae non",
        body: "Cum dolores.",
      },
    ];
    const formattedProblems = formatBooleans(problems);

    expect(formattedProblems).not.toBe(problems);
    formattedProblems.forEach((problem, index) => {
      expect(problem).not.toBe(problems[index]);
    });
  });
});
