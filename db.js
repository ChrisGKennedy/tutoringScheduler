const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "chester",
  host: "localhost",
  port: 5432,
  database: "simplescheduler", //CHANGE THIS LINE TO GO BETWEEN DB'S "scheduler" vs "simplescheduler"
});

module.exports = pool;
