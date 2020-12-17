//creating dependencies 
const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",

});

connection.connect(function (error) {
    if (error) throw error
    console.log("connection id" + connection.threadId)
    menu();
});

function menu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choices",
            choices: [

            ]
        }
    ])}
