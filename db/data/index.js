const ENV = process.env.NODE_ENV || "development";

const testData = require("./test-data");
const devData = require("./dev-data");
const prodData = require("./prod-data");

const data = {
  development: devData,
  test: testData,
  production: prodData,
};

module.exports = data[ENV];
