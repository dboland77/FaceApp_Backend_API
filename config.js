const Pool = require("pg").Pool;
const dotenv = require("dotenv").config();

const env = process.env.NODE_ENV;

let connectionString = {
  user: "postgres",
  password: "",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

console.log(connectionString, env);

// Check which environment (dev or production) and decide
// on the connection string to use

console.log(env, env === "development");

if (env === "development") {
  connectionString.database = process.env.DB_DATABASE;
} else {
  connectionString = {
    connectionString: process.env.DATABASE_URL,
  };
}

console.log(connectionString);

const pool = new Pool(connectionString);

module.exports = pool;
