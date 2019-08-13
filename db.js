//Import the dotenv module
//Call its `.config()` method 
require('dotenv').config();

const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database:process.env.DB_NAME
    // host: "127.0.0.1",
    // port: 5432,
    // database: "todo-app"
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_NAME);

console.log('yeah');

module.exports = db