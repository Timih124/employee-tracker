//creating dependencies 
const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDb",

});

connection.connect(function (error) {
    if (error) throw error
    console.log("connection id" + connection.threadId)
    menu();
});

// start the prompt
function menu() {

    // list of questions for node menu
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choices",
            choices: [
                "View Departments",
                "View Roles",
                "View Employee",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee"
            ]
        }
    ]).then(function (response) {
        switch (response.choices) {
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employee":
                viewEmployee();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee":
                updateEmployee();
                break;

        }
    })
}
// view departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        console.table(results)
        menu();
    })
}
// view all roles
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, results) {
        console.table(results)
        menu();
    })
}

// view all employees
function viewEmployee() {
    connection.query("SELECT * FROM employee", function (err, results) {
        console.table(results)
        menu();
    })

}

// add employee to employee tracker
function addEmployee() {
    connection.query("SELECT * FROM employee", function (err, employee) {
        if (err) throw err;
        var newemployee = employee.map(employee => employee.first_name + " " + employee.last_name)

        connection.query("SELECT * FROM role", function (err, roles) {
            var newRole = roles.map(roles => roles.title)
            // inquirer prompt for questions to ask about new employees
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is employees first name?",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "What is employees last name?",
                    name: "lastName"
                },
                {
                    type: "list",
                    message: "What is their new department id?",
                    name: "employeeRole",
                    choices: newRole
                },
                {
                    type: "list",
                    message: "Who is their manager?",
                    name: "employeeManager",
                    choices: newemployee
                }
            ]).then(function (response) {
                var role = roles.find(role => role.title === response.newRole)
                var manager = employee.find(employee => (employee.first_name + " " + employee.last_name) === response.employeeManager)

                connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [response.firstName, response.lastName, role.id, newemployee.id], function (err, results) {
                    console.log("Successfully added")
                    menu();
                })
            })
        })

    })

}

// creating  function to addRole
function addRole() {
    connection.query("SELECT * FROM department", function (err, departments) {
        var newDepartments = departments.map(department => department.name)
        inquirer.prompt([
            {
                type: "input",
                message: "What is the title?",
                name: "employeeTitle"
            },
            {
                type: "input",
                message: "What is their salary",
                name: "employeeSalary"
            },
            {
                type: "list",
                message: "What is their new department id?",
                name: "departmentName",
                choices: newDepartments
            }
        ]).then(function (response) {
            var department = departments.find(department => department.name === response.departmentName)
            connection.query("INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)", [response.employeeTitle, response.employeeSalary, department.id], function (err, results) {
                console.log("Successfully added")
                menu();
            })
        })
    })

}

//  function to add new department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new department?",
            name: "departmentName"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO department(name) VALUES(?)", response.departmentName, function (err, results) {
            console.log("Successfully added")
            menu();
        })
    })
}

// still need to finish updateEmployee plan to get it
function updateEmployee() {
}
