const faker = require("faker");
const { sample, shuffle } = require("lodash");

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

const getDateMonthsAgo = (months) => {
    const yearAgo = new Date();
    yearAgo.setMonth(yearAgo.getMonth() - months);
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
    const eighteenMonthsAgo = getDateMonthsAgo(18);
    const oneYearAgo = getDateMonthsAgo(12);

    for (let i = 0; i < n; i++) {
        const shuffledSkills = shuffle(techList);
        const role = roleRef[Math.round(Math.random())];

        const user = {
            created_at: faker.date.between(eighteenMonthsAgo, oneYearAgo),
            name: faker.name.findName(),
            username: faker.internet.userName(),
            avatar_url: faker.image.avatar(),
            online_status: "false",
            role: role,
            bug_points: Math.round(Math.random() * 100),
            bug_points_over_month: Math.round(Math.random() * 10),
            github_url: role === "mentor" ? `https://github.com/${faker.random.word()}` : null,
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
    const oneYearAgo = getDateMonthsAgo(12);

    for (let i = 0; i < n; i++) {
        const problem = {
            title: faker.lorem.sentence(),
            username: sample(users).username,
            body: faker.lorem.paragraph(),
            difficulty: Math.round(Math.random() * 2),
            solved: faker.random.boolean().toString(),
            tech: sample(tech).slug,
            created_at: faker.date.between(oneYearAgo, new Date()),
        };
        problems.push(problem);
    }
    return problems;
};

const generateSuggestionData = (upToNPerProblem, problems, users) => {
    const suggestions = [];
    for (problem of problems) {
        let isApproved = "true";

        for (let i = 0; i < Math.round(Math.random() * upToNPerProblem); i++) {
            let suggestion = {
                belongsTo: problem.title,
                username: sample(users).username,
                body: faker.lorem.sentence(),
                approved: problem.solved === "true" ? isApproved : "false",
                created_at: faker.date.between(problem.date, new Date()),
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

module.exports = {
    techList,
    getDateMonthsAgo,
    generateTechData,
    generateUserData,
    generateProblemData,
    generateSuggestionData,
    formatData,
};