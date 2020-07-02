const { Manager } = require("./Develop/lib/Manager");
const { Engineer } = require("./Develop/lib/Engineer");
const { Intern } = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const chalkPipe = require('chalk-pipe');
const color = require('./Develop/chalk/colors');
const path = require("path");
const fs = require("fs");
const { validateEntries, validateNumbers, validateEmail } = require('./Develop/lib/validate');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const { render } = require("./Develop/lib/htmlRenderer");
const validate = require("./Develop/lib/validate");
const { clearScreenDown } = require("readline");

const teamMembers = [];


// Main Questions 
const questions = [
    {
        type: 'input',
        message: color.blue('what is your name?'),
        name: 'name',
        validate: validateEntries
    },
    {
        type: 'input',
        message: color.blue('what is your id number?'),
        name: 'id',
        validate: validateNumbers
    },
    {
        type: 'input',
        message: color.blue('what is your email?'),
        name: 'email',
        validate: validateEmail
    },
    {
        type: 'list',
        message: color.blue('Please check your role in the company'),
        choices: [
            color.red('Manager'),
            color.green('Intern'),
            color.purple('Engineer'),
        ],
        name: 'role'
    },
]

// Manager Questions
const managerQuestions = [
    {
        type: 'input',
        message: color.red('What is you office number'),
        name: 'officeNumber',
        validate: validateNumbers
    }
]

// Intern Questions
const internQuestions = [
    {
        type: 'input',
        message: color.green('What school did you go to?'),
        name: 'school',
        validate: validateEntries
    }
]

// Engineer Questions
const engineerQuestions = [
    {
        type: 'input',
        message: color.purple('Please enter your github user name'),
        name: 'gitHub',
        validate: validateEntries
    }
]

// confirm more employee 
const moreEmployee = [
    {
        type: 'confirm',
        message: 'Would you like to add more team members?',
        name: 'confirm',
        default: false
    }
]

async function Question() {

    try {
        // first round of basic question to answer 
        let mainAnswers = await inquirer.prompt(questions);

        // figures out the next role of questions that need to be answered
        let role = await sendToNextPrompt(mainAnswers);

        // get the role specific questions
        let roleAnswers = await inquirer.prompt(role);

        // all of the employee data 
        // compiled in one  object 
        let employeeData = await { ...mainAnswers, ...roleAnswers };

        // takes the employee and builds with the appropriate constructor 
        let employee = await buildEmployee(employeeData);

        // push the new created employye to the teamMembers array 
        teamMembers.push(employee);

        // console logging the array to check where we at 
        // console.log(teamMembers);

        // ask if they would like to add more team members
        let employeeAdd = await inquirer.prompt(moreEmployee);

        // validate response for the next action
        addMoreOrRender(employeeAdd.confirm);
    }
    catch (err) {
        console.log(`theres was an error somewhere in the async ${err}`);
    }

}

// builds a the new Employee with the specific constructor
function buildEmployee(employee) {
    let name = employee.name;
    let id = employee.id;
    let email = employee.email;
    let role = employee.role; 

    // checking to see the correct keys and values 
    // console.log('inside the build employee function',employee);

    switch (role) {
        case 'Manager': return new Manager(name, id, email, employee.officeNumber);
        case 'Intern': return new Intern(name, id, email, employee.school);
        case 'Engineer': return new Engineer(name, id, email, employee.gitHub);
        default: return 'something went really wrong in building an employee';
    }
}

// decodes the color UI code 
function colorDecoder(role) {
    // based on the unique id choose the correct role 
    if (role === '\u001b[31m\u001b[1mManager\u001b[22m\u001b[39m') {
        return 'Manager';
    } else if (role === '\u001b[32m\u001b[1mIntern\u001b[22m\u001b[39m') {
        return 'Intern';
    } else if (role === '\u001b[38;2;128;0;128m\u001b[1mEngineer\u001b[22m\u001b[39m') {
        return 'Engineer';
    }
}

// this function returns the specific role questions needed for the next prompt 
function sendToNextPrompt(employee) {
    // let role;

    // testing the color ui
    // console.log('this is inside the next prompt',employee);

    employee.role = colorDecoder(employee.role);

    // testing output
    // console.log(employee); 

    switch (employee.role) {
        case 'Manager': return managerQuestions;
        case 'Intern': return internQuestions;
        case 'Engineer': return engineerQuestions;
        default: return `Something went really wrong! did you pick a role?`;
    }
}

// restarts the whole thing again or returns for the next step 
function addMoreOrRender(confirm) {
    if (confirm) {
        // return back to the top of the questions are add in another employee 
        return Question();
    }

    //// checking to see if this directory exist 
    fs.access(OUTPUT_DIR, (err) => {
        if (err) {

            // if it doesn't exist we make it and then create the file 
            console.log(`This directory does not exist, Creating now!!!`);
            fs.mkdir(OUTPUT_DIR, (err) => (err) ? console.log(err) : writeHTML());
        } else {

            //// else we just create the html 
            writeHTML();
        }
    })
}

// function writes the html for the website 
function writeHTML() {
    let html = render(teamMembers)

    fs.writeFile(outputPath, html, (err) => {
        (err) ? console.log(err) : console.log('The file has been written succesfully!');
    });
}


Question();



