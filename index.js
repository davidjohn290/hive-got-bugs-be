const faker = require("faker");
const shuffle = require("shuffle-array");
const { sample } = require("lodash");

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
  console.log(yearAgo);
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
    const shuffledSkills = shuffle(techList, { copy: true });
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
  let problems = [];
  const oneYearAgo = getDateOneYearAgo();

  for (let i = 0; i < n; i++) {
    const problem = {
      title: faker.lorem.word(),
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

const generateSuggestionData = (n, problems) => {
  const suggestions = [];
  for (let i = 0; i < n; i++) {
    let suggestion = {
      body: faker.lorem.sentence(),
      approved: false,
    };
    suggestions.push(suggestion);
  }
  return suggestions;
};

const tech = generateTechData(techList);
const users = generateUserData(10);
const problems = generateProblemData(20, users, tech);
const suggestions = generateSuggestionsData(100, problems);

console.log(suggestions);
