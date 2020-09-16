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
const users = generateUserData(5);
const problems = generateProblemData(10, users, tech);
const suggestions = generateSuggestionData(4, problems, users);

mkdir("./db/data/test-data")
  .then(() => {
    return writeFile("./db/data/test-data/tech.js", formatData(tech), "utf8");
  })
  .then(() => {
    return writeFile("./db/data/test-data/users.js", formatData(users), "utf8");
  })
  .then(() => {
    return writeFile(
      "./db/data/test-data/problems.js",
      formatData(problems),
      "utf8"
    );
  })
  .then(() => {
    return writeFile(
      "./db/data/test-data/suggestions.js",
      formatData(suggestions),
      "utf8"
    );
  })
  .catch((err) => {
    console.log(err);
  });
