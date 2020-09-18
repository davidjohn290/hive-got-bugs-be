const { promisify } = require("util");
const fs = require("fs");
const {
  techList,
  generateTechData,
  generateUserData,
  generateProblemData,
  generateSuggestionData,
  formatData,
} = require("../utils/dataHelpers");

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const tech = generateTechData(techList);
const users = generateUserData(10);
const problems = generateProblemData(30, users, tech);
const suggestions = generateSuggestionData(10, problems, users);

mkdir("./db/data/dev-data", { recursive: true })
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
      "./db/data/dev-data/suggestions.js",
      formatData(suggestions),
      "utf8"
    );
  })
  .catch((err) => {
    console.log(err);
  });
