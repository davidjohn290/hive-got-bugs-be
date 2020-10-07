# Hive Got Bugs (Back End) 🐛

Hive Got Bugs is a site where junior developers can share solutions to common coding problems, while also having access to expert, personalised help from an experienced mentor. This is the back end of the project, a RESTful API built using Node.js, Express, Knex.js, and PostgreSQL, with testing carried out using Jest. The site was built in two weeks as a final group project as part of the [Northcoders](https://www.northcoders.com/) coding bootcamp.

- View the [hosted API](https://hive-got-bugs.herokuapp.com/api/)

- View a [presentation and demo](https://www.youtube.com/watch?v=fFv-CJZnrbI) of the site

- Visit the [deployed site](https://hive-got-bugs.netlify.app/) (you will need a github account in order to log in or post)

- View the [front end repository](https://github.com/davidjohn290/hive-got-bugs-fe)

## Prerequisites

- Node.js
- PostgreSQL

## Installation

- Fork and clone this repository
- Install the necessary dependencies: `npm install`
- If using linux, you will need to add your PSQL username and password information to the `customConfig` object in `knexfile.js`. To keep you details secure, you should export these details from a new javascript file, and add this file to the `.gitignore`. Your details can then be added to the customConfig object as variables:

```javascript
const {username, password} = require("./mySecretFile.js");

const customConfig = {
  development: {
    connection: {
      database: "hive_got_bugs",
      user: username,
      password: password,
    },
  },
  test: {
    connection: {
      database: "hive_got_bugs_test",
      user: username
      password: password,
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
```

## Using the API locally

- Make sure that PostgreSQL is installed and running
- Seed the database: `npm run seed-dev`
- Start the server, which will run on port 9090: `npm start`
- In the browser, navigate to `localhost:9090/api` to view a JSON file showing the available endpoints

## Running tests

- Tests check each endpoint of the API, and are run using `jest` and `supertest`
- The database is automatically reseeded before each test. Alternatively, reseeding can be carried out manually using `npm run seed-test`
- To run the tests: `npm test`

## Authors

- **Stephen Bradshaw** - [stephenjbradshaw](https://github.com/stephenjbradshaw)
- **David John** - [davidjohn290](https://github.com/davidjohn290)
- **Kojo Kwakye** - [kojjob](https://github.com/kojjob)
- **Jasmine Lloyd** - [XCodeCreatorX](https://github.com/xcodecreatorx)
