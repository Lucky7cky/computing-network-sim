const mysql = require("mysql");

const db = mysql.createPool({
    host: "82.156.170.136",
    user: "root",
    password: "Qwepoi.123456",
    database: "network",
});

module.exports = db;
