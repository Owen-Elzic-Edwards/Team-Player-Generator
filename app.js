const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const employees = [];

const makePrompt = (choice) => {
 return [
     {
         type: 'input',
         message: `What is your ${choice.role}'s name?`,
         name: 'name'
     },
     {
         type: 'input',
         message: `What is your ${choice.role}'s id?`,
         name: 'id'
     },
     {
         type: 'input',
         message: `What is your ${choice.role}'s email?`,
         name: 'email'
     },
     {
         type: 'input',
         message: `What is your ${choice.role}'s ${choice.info}?`,
         name: 'info'
     }
 ]
}

const initial = [
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        choices: [
            {
                name: 'manager',
                value: {
                    role: 'manager',
                    info: 'office number',
                    employee(w, x, y, z) {return new Manager(w, x, y, z)}
                }
            }, 
            {
                name: 'engineer',
                value: {
                    role: 'engineer',
                    info: 'Github username',
                    employee(w, x, y, z) {return new Engineer(w, x, y, z)} 
                }
            }, 
            {
                name: 'intern',
                value: {
                    role: 'intern',
                    info: 'school',
                    employee(w, x, y, z) {return new Intern(w, x, y, z)}
                }
            }, 
            {
                name: 'I dont want to add anymore team members',
                value: false
            }
        ],
        name: 'choice'
    }
]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

const init = () => {
    if(!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
    console.log('Please build your team');
    question(initial[0].choices[0].value);
};

const question = choice => {
if (choice){
inquirer.prompt(makePrompt(choice))
    .then(data => {
        employees.push(choice.employee(...data));
        inquirer.prompt(initial)
        .then(answer => question(answer.choice));
    })
} else {
    fs.writeFile(outputPath, render(employees), () => console.log("success!"));
}
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...

init();
