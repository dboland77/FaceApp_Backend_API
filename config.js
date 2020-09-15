const Pool = require("pg").Pool;
const dotenv = require('dotenv');

const pool = new Pool({
    user: "postgres",
    password:"",
    database:process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

module.exports = pool;