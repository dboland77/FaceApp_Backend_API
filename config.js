const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"",
    database:"faceapplogin",
    host: "localhost",
    port: 5432
});

module.exports = pool;