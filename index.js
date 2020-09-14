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

const generateTechData = (techList) => {
    return techList.map((pieceOfTech) => {
        return { slug: pieceOfTech };
    });
};

const generateUserData = (n) => {
    const users = [];
    const roleRef = { 0: "user", 1: "mentor" };

    for (let i = 0; i < n; i++) {
        const shuffledSkills = shuffle(skills, { copy: true });
        const role = roleRef[Math.round(Math.random())];

        const users = {
            name: faker.name.findName(),
            username: faker.internet.userName(),
            avatarUrl: faker.image.avatar(),
            onlineStatus: false,
            role: role,
            bugPoints: Math.round(Math.random() * 100),
            bugPointsPrevMonth: Math.round(Math.random() * 10),
            githubUrl: role === "mentor" ? `https://github.com/${faker.random.word()}` : null,
            description: role === "mentor" ? faker.lorem.paragraph() : null,
            skill1: role === "mentor" ? shuffledSkills[0] : null,
            skill2: role === "mentor" ? shuffledSkills[1] : null,
            skill3: role === "mentor" ? shuffledSkills[2] : null,
            skill4: role === "mentor" ? shuffledSkills[3] : null,
        };
        users.push(userData);
    }

    return users;
};

// const generateProblemData = (n, userdata) => {};

const generateProblemData = (n) => {
    // problem_id, title, user, body, difficulty: int, solved:bool, tech
    let problems = [];
    for (let i = 0; i < n; i++) {
        const problem = {
            title: faker.lorem.word(),
            // user: ???
            body: faker.lorem.sentence(),
            difficulty: Math.round(Math.random() * 3),
            solved: faker.random.boolean().toString(),
            tech: faker.lorem.words(), //placeholder
            date: faker.date.recent(),
        };
        problems.push(problem);
    }

    return problems;
};

const generateSuggestionData = (n) => {
    const suggestions = [];
    for (let i = 0; i < n; i++) {
        let suggestion = {
            body: faker.lorem.sentence(),
            approvedByMentor: false,
        };
        suggestions.push(suggestion);
    }
    return suggestions;
};

const suggestions = generateSuggestionData(10);

console.log(suggestions);

// const problems = generateProblemData(10);

// console.log(problems);

//const tech = generateTechData(techList);
// const users = generateUserData(10);
// const problems = generateProblemData(10, users)

// Users, problems, suggestions, tech