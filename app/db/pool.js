const pgp = require('pg-promise')();
require('dotenv').config()

var pool = pgp(process.env.DATABASE_URL)

module.exports = pool;
