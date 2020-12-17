const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');

const connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
});