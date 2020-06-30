const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



// inquirer.prompt(questions);
// // array of questions for user
// const questions = [
//     // THIS IS THE NAME SECTION ********************
//     {
//         type: 'input',
//         message: 'What is your name',
//         name: 'name',
//         validate: validateEntries
//     },
//     // THIS IS THE ROLE SECTION ********************
//     {
//         type: 'input',
//         message: 'What is your role in the project',
//         name: 'role',
//         validate: validateEntries
//     },
//     // THIS IS THE TITLE SECTION ********************
//     {
//         type: 'input',
//         message: 'What is the title of your project',
//         name: 'title',
//         validate: validateEntries
//     },
//     // THIS IS THE DESCRIPTION SECTION ********************
//     {
//         type: 'input',
//         message: 'Please, provide a brief description of you project.',
//         name: 'description',
//         validate: validateEntries
//     },
//     // THIS IS THE INSTALLATION SECTION ********************
//     {
//         type: 'input',
//         message: 'Please, provide an explanation of how to install the software',
//         name: 'Installation',
//         validate: validateEntries
//     },
//     // THIS IS THE USAGE SECTION ********************
//     {
//         type: 'input',
//         message: 'Provide instructions and examples for use of this program',
//         name: 'Usage',
//         validate: validateEntries
//     },
//     // THIS IS THE LICENSE SECTION ********************
//     {
//         type: 'list',
//         message: 'Please check the license you would like to use for this project',
//         choices: [
//             'GNU AGPLv3',
//             'GNU GPLv3',
//             'GNU LGPLv3',
//             'GNU FDL v1.3',
//             'Mozilla Public License 2.0',
//             'Apache License 2.0',
//             'MIT License',
//             'Boost Software License 1.0',
//             'IBM Public License Version 1.0',
//             'Eclipse Public License 1.0',
//             'Unlicense'
//         ],
//         name: 'license'
//     },
//     // THIS IS THE CONTRIBUTING SECTION ********************
//     {
//         type: 'input',
//         message: 'Please specify the way you would like a contributor to contribute',
//         name: 'contributing',
//         validate: validateEntries
//     },
//     // THIS IS THE TEST SECTION ********************
//     {
//         type: 'input',
//         message: 'Please enter any testing code you would like to provide',
//         name: 'test',
//         validate: validateEntries
//     },
//     // THIS IS THE CREDIT/CONTACT INFO SECTION ********************
//     // THIS IS THE userName INFO SECTION ********************
//     {
//         type: 'input',
//         message: 'Please enter your github user name',
//         name: 'userName',
//         validate: validateEntries

//     },
//     // THIS IS THE userEmail INFO SECTION ********************
//     {
//         type: 'input',
//         message: 'Please enter your github user email',
//         name: 'userEmail',
//         validate: value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? true : 'this is not a valid email adress'
//     }
// ];
