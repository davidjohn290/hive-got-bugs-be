const {
  makeRefObj,
  replaceKey,
  formatBooleans,
} = require("../utils/seedHelpers");

describe("makeRefObj()", () => {
  test("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).toEqual({});
  });
  test("returns a single-item reference object with passed a single-object array", () => {
    const articles = [
      {
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        body: "some gifs",
      },
    ];
    const articleRef = makeRefObj(articles, "title", "article_id");
    expect(articleRef).toEqual({
      "Eight pug gifs that remind me of mitch": 3,
    });
  });
  test("returns a multi-item reference object when passed a multi-object array", () => {
    const articles = [
      {
        article_id: 5,
        title: "UNCOVERED: catspiracy to bring down democracy",
        body: "Bastet walks amongst us, and the cats are taking arms!",
      },
      {
        article_id: 6,
        title: "A",
        body: "Delicious tin of cat food",
      },
      {
        article_id: 7,
        title: "Z",
        body: "I was hungry.",
      },
    ];
    const articleRef = makeRefObj(articles, "title", "article_id");
    expect(articleRef).toEqual({
      "UNCOVERED: catspiracy to bring down democracy": 5,
      A: 6,
      Z: 7,
    });
  });
  test("input is not mutated", () => {
    const articles = [
      {
        article_id: 5,
        title: "UNCOVERED: catspiracy to bring down democracy",
        body: "Bastet walks amongst us, and the cats are taking arms!",
      },
      {
        article_id: 6,
        title: "A",
        body: "Delicious tin of cat food",
      },
      {
        article_id: 7,
        title: "Z",
        body: "I was hungry.",
      },
    ];
    makeRefObj(articles, "title", "article_id");
    expect(articles).toEqual([
      {
        article_id: 5,
        title: "UNCOVERED: catspiracy to bring down democracy",
        body: "Bastet walks amongst us, and the cats are taking arms!",
      },
      {
        article_id: 6,
        title: "A",
        body: "Delicious tin of cat food",
      },
      {
        article_id: 7,
        title: "Z",
        body: "I was hungry.",
      },
    ]);
  });
});

describe("replaceKey()", () => {
  test("returns an empty array when passed an empty array", () => {
    expect(replaceKey([])).toEqual([]);
  });
  test("formats a single-object array", () => {
    const suggestion = [
      {
        belongs_to: "Explicabo sunt labore et",
        created_at: "2020-05-11T02:43:06.595Z",
        username: "Francisco.Quitzon30",
        approved_by: "Jasmin38",
        body: "Accusamus vel similique aut suscipit quas ducimus maxime.",
      },
    ];
    const ref = { "Explicabo sunt labore et": 12 };
    expect(replaceKey(suggestion, ref, "problem_id", "belongs_to")).toEqual([
      {
        problem_id: 12,
        created_at: "2020-05-11T02:43:06.595Z",
        username: "Francisco.Quitzon30",
        approved_by: "Jasmin38",
        body: "Accusamus vel similique aut suscipit quas ducimus maxime.",
      },
    ]);
  });
  test("formats a multi-object array", () => {
    const suggestions = [
      {
        belongs_to: "Rerum repudiandae",
        created_at: "2020-05-11T02:43:06.595Z",
        username: "Francisco.Quitzon30",
        approved_by: "Jasmin38",
        body: "Accusamus vel similique aut suscipit quas ducimus maxime.",
      },
      {
        belongs_to: "Rerum repudiandae",
        created_at: "2020-06-21T12:50:32.902Z",
        username: "Jasmin38",
        approved_by: null,
        body: "Omnis ipsam mollitia nihil sed voluptatum id vero eos incidunt.",
      },
      {
        belongs_to: "Explicabo sunt",
        created_at: "2020-08-05T06:35:26.694Z",
        username: "Dion_Steuber58",
        approved_by: null,
        body: "Dolor eos provident aut quia commodi voluptatem.",
      },
    ];
    const ref = { "Rerum repudiandae": 7, "Explicabo sunt": 42 };
    const formattedSuggestions = replaceKey(
      suggestions,
      ref,
      "problem_id",
      "belongs_to"
    );
    expect(formattedSuggestions).toEqual([
      {
        problem_id: 7,
        created_at: "2020-05-11T02:43:06.595Z",
        username: "Francisco.Quitzon30",
        approved_by: "Jasmin38",
        body: "Accusamus vel similique aut suscipit quas ducimus maxime.",
      },
      {
        problem_id: 7,
        created_at: "2020-06-21T12:50:32.902Z",
        username: "Jasmin38",
        approved_by: null,
        body: "Omnis ipsam mollitia nihil sed voluptatum id vero eos incidunt.",
      },
      {
        problem_id: 42,
        created_at: "2020-08-05T06:35:26.694Z",
        username: "Dion_Steuber58",
        approved_by: null,
        body: "Dolor eos provident aut quia commodi voluptatem.",
      },
    ]);
  });
  test("returned array and objects have new references", () => {
    const suggestions = [
      {
        belongs_to: "Rerum repudiandae",
        created_at: "2020-05-11T02:43:06.595Z",
        username: "Francisco.Quitzon30",
        approved_by: "Jasmin38",
        body: "Accusamus vel similique aut suscipit quas ducimus maxime.",
      },
      {
        belongs_to: "Rerum repudiandae",
        created_at: "2020-06-21T12:50:32.902Z",
        username: "Jasmin38",
        approved_by: null,
        body: "Omnis ipsam mollitia nihil sed voluptatum id vero eos incidunt.",
      },
      {
        belongs_to: "Explicabo sunt",
        created_at: "2020-08-05T06:35:26.694Z",
        username: "Dion_Steuber58",
        approved_by: null,
        body: "Dolor eos provident aut quia commodi voluptatem.",
      },
    ];
    const ref = { "Rerum repudiandae": 7, "Explicabo sunt": 42 };
    const formattedSuggestions = replaceKey(
      suggestions,
      ref,
      "problem_id",
      "belongs_to"
    );
    expect(formattedSuggestions).not.toBe(suggestions);
    formattedSuggestions.forEach((suggestion, index) => {
      expect(suggestion).not.toBe(suggestions[index]);
    });
  });
  test("input is not mutated", () => {
    const suggestion = [
      {
        belongs_to: "Rerum repudiandae",
        created_at: "2020-05-11T02:43:06.595Z",
        username: "Francisco.Quitzon30",
        approved_by: "Jasmin38",
        body: "Accusamus vel similique",
      },
    ];
    const ref = { "Rerum repudiandae": 7 };
    replaceKey(suggestion, ref, "problem_id", "belongs_to");
    expect(suggestion).toEqual([
      {
        belongs_to: "Rerum repudiandae",
        created_at: "2020-05-11T02:43:06.595Z",
        username: "Francisco.Quitzon30",
        approved_by: "Jasmin38",
        body: "Accusamus vel similique",
      },
    ]);
  });
});

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
        solved: false,
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
});
