const pool = require('./pool')

const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  full_name VARCHAR(100), 
  address VARCHAR(100), 
  phone VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created DATE NOT NULL)`;

    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            console.log("Generation successful");
            pool.$pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.$pool.end();
        });
};


const createAllTables = () => {
    createUserTable();
};

module.exports = {createAllTables};

require('make-runnable');
