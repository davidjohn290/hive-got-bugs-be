const faker = require("faker");
const { sample, shuffle } = require("lodash");
const { promisify } = require("util");
const fs = require("fs");

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const techList = [
  "JavaScript",
  "Python",
  "Ruby",
  "React",
  "Java",
  "TypeScript",
  "Django",
  "C++",
  "C",
  "C#.net",
  "Redux",
  "Vue.js",
  "Express",
  "Jest",
  "SQL",
];

const getDateOneYearAgo = () => {
  const yearAgo = new Date();
  yearAgo.setMonth(yearAgo.getMonth() - 12);
  return yearAgo;
};

const generateTechData = (techList) => {
  return techList.map((pieceOfTech) => {
    return { slug: pieceOfTech };
  });
};

const generateUserData = (n) => {
  const users = [];
  const roleRef = { 0: "user", 1: "mentor" };

  for (let i = 0; i < n; i++) {
    const shuffledSkills = shuffle(techList);
    const role = roleRef[Math.round(Math.random())];

    const user = {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.avatar(),
      onlineStatus: "false",
      role: role,
      bugPoints: Math.round(Math.random() * 100),
      bugPointsPrevMonth: Math.round(Math.random() * 10),
      githubUrl:
        role === "mentor" ? `https://github.com/${faker.random.word()}` : null,
      description: role === "mentor" ? faker.lorem.paragraph() : null,
      skill1: role === "mentor" ? shuffledSkills[0] : null,
      skill2: role === "mentor" ? shuffledSkills[1] : null,
      skill3: role === "mentor" ? shuffledSkills[2] : null,
      skill4: role === "mentor" ? shuffledSkills[3] : null,
    };
    users.push(user);
  }

  return users;
};

const generateProblemData = (n, users, tech) => {
  const problems = [];
  const oneYearAgo = getDateOneYearAgo();

  for (let i = 0; i < n; i++) {
    const problem = {
      title: faker.lorem.sentence(),
      user: sample(users).username,
      body: faker.lorem.paragraph(),
      difficulty: Math.round(Math.random() * 2),
      solved: faker.random.boolean().toString(),
      tech: sample(tech).slug,
      date: faker.date.between(oneYearAgo, new Date()),
    };
    problems.push(problem);
  }
  return problems;
};

const generateSuggestionData = (upToNPerProblem, problems) => {
  const suggestions = [];
  for (problem of problems) {
    let isApproved = "true";

    for (let i = 0; i < Math.round(Math.random() * upToNPerProblem); i++) {
      let suggestion = {
        belongsTo: problem.title,
        body: faker.lorem.sentence(),
        approved: problem.solved === "true" ? isApproved : "false",
        date: faker.date.between(problem.date, new Date()),
      };
      suggestions.push(suggestion);
      isApproved = "false";
    }
  }
  return suggestions;
};

const formatData = (array) => {
  return `module.exports = ${JSON.stringify(array, null, 2)}`;
};

const tech = generateTechData(techList);
const users = generateUserData(5);
const problems = generateProblemData(10, users, tech);
const suggestions = generateSuggestionData(4, problems);

mkdir("./db/data/dev-data")
  .then(() => {
    return writeFile("./db/data/dev-data/tech.js", formatData(tech), "utf8");
  })
  .then(() => {
    return writeFile("./db/data/dev-data/users.js", formatData(users), "utf8");
  })
  .then(() => {
    return writeFile(
      "./db/data/dev-data/problems.js",
      formatData(problems),
      "utf8"
    );
  })
  .then(() => {
    return writeFile(
      "./db/data/dev-data/solutions.js",
      formatData(users),
      "utf8"
    );
  })
  .catch((err) => {
    if (err.errno === -17)
      console.log("The folder or files already exist, delete them first");
    else console.log(err);
  });
