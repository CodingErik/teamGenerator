const {Manager} = require("./lib/Manager");
const {Engineer} = require("./lib/Engineer");
const {Intern} = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { validateEntries, validateNumbers, validateEmail } = require('./lib/validate');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const {render} = require("./lib/htmlRenderer");
const validate = require("./lib/validate");
const { clearScreenDown } = require("readline");




// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

const teamMembers = [];

// Main Questions 
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
        validate: validateEmail
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
        type: 'input',
        message: 'What is you office number',
        name: 'officeNumber',
        validate: validateNumbers
    }
]

// Intern Questions
const internQuestions = [
    {
        type: 'input',
        message: 'What school did you go to?',
        name: 'school',
        validate: validateEntries
    }
]

// Engineer Questions
const engineerQuestions = [
    {
        type: 'input',
        message: 'Please enter your github user name',
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
        console.log(teamMembers); 

        // ask if they would like to add more team members
        let employeeAdd = await inquirer.prompt(moreEmployee);

        // validate response for the next action
        addMoreOrRender(employeeAdd.confirm);

      
}

// builds a the new Employee with the specific constructor
function buildEmployee(employee){
    let name = employee.name; 
    let id = employee.id; 
    let email = employee.email; 
    let role = employee.role;

    // checking to see the correct keys and values 
    // console.log('inside the build employee function',employee);

    switch (role) {
        case 'Manager': return new Manager(name,id,email, employee.officeNumber);
        case 'Intern': return new Intern(name,id,email, employee.school); 
        case 'Engineer': return new Engineer(name,id,email,employee.gitHub);
        default: return 'something went really wrong in building an employee'; 
    }
}

// this function returns the specific role questions needed for the next prompt 
function sendToNextPrompt(employee) {
    let role = employee.role
    switch (role) {
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
    } else {
        // call the render functio and write the html file 
        console.log(render(teamMembers));  
    }
}


Question();



