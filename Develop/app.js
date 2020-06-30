const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { validateEntries,validateNumbers} = require('./lib/validate');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const validate = require("./lib/validate");


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


const questions = [
    {
        type: 'input',
        message: 'what is your name?',
        name: 'name',
        validate: validateEntries
    },
    {
        type: 'input',
        message: 'what is your id number?',
        name: 'id',
        validate: validateNumbers
    },
    {
        type: 'input',
        message: 'what is your email?',
        name: 'email',
        validate: value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? true : 'this is not a valid email adress'
    },
    {
        type: 'list',
        message: 'Please check your role in the company',
        choices: [
            'Manager',
            'Intern',
            'Engineer',
        ],
        name: 'role'
    },


]

// Manager Questions
const managerQuestions = [
    {
        type: 'number',
        message: 'What is you office number',
        name: 'officeNumber',
        validate: validateNumbers
    }
]

// Intern Questions
const internQuestions = ['intern']

// Engineer Questions
const engineerQuestions = ['engineer']


async function basicQuestion() {

    // first round of question to answer 
    let mainAnswers = await inquirer.prompt(questions);
    // figures out the next role of questions that need to be answered
    let role = await sendToNextPrompt(mainAnswers); 

    console.log(role);
    // let roleAnswers = await inquirer.prompt(role);
    
}

// this function returns the specific role questions needed for the next prompt 
function sendToNextPrompt(employee){
    let role = employee.role
    switch (role) {
        case 'Manager': return managerQuestions;
        case 'Intern': return internQuestions;
        case 'Engineer': return engineerQuestions;
        default: return `Something went really wrong! did you pick a role?`;
    }
}


basicQuestion(); 



