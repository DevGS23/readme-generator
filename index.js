import inquirer from 'inquirer';
import fs from 'fs/promises';

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title?',
        validate: input => input.trim() !== '' ? true : 'Project title is required!'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
        validate: input => input.trim() !== '' ? true : 'Description is required!'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
        default: 'npm install'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use this project?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to this project?'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What commands should be run for tests?',
        default: 'npm test'
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        validate: input => input.trim() !== '' ? true : 'GitHub username is required!'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        validate: input => {
            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
            return valid ? true : 'Please enter a valid email address!';
        }
    }
];

// Function to generate license badge
function renderLicenseBadge(license) {
    if (license === 'None') return '';
    return `![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-blue.svg)`;
}

// Function to generate license link
function renderLicenseLink(license) {
    if (license === 'None') return '';
    const licenseLinks = {
        'MIT': 'https://opensource.org/licenses/MIT',
        'Apache 2.0': 'https://opensource.org/licenses/Apache-2.0',
        'GPL 3.0': 'https://www.gnu.org/licenses/gpl-3.0',
        'BSD 3': 'https://opensource.org/licenses/BSD-3-Clause'
    };
    return licenseLinks[license];
}

// Function to generate the README content
function generateMarkdown(data) {
    return `# ${data.title}

${renderLicenseBadge(data.license)}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

\`\`\`
${data.installation}
\`\`\`

## Usage

${data.usage}

## License

This project is licensed under the ${data.license} license. For more information, see ${renderLicenseLink(data.license)}

## Contributing

${data.contributing}

## Tests

To run tests, use the following command:

\`\`\`
${data.tests}
\`\`\`

## Questions

For any questions, please contact me:

- GitHub: [${data.github}](https://github.com/${data.github})
- Email: ${data.email}
`;
}

// Function to write README file
async function writeToFile(fileName, data) {
    try {
        await fs.writeFile(fileName, data);
        console.log('Successfully created README.md!');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

// Function to initialize app
async function init() {
    try {
        console.log('Welcome to the Professional README Generator!');
        console.log('Please answer the following questions to generate your README.md file.\n');
        
        const answers = await inquirer.prompt(questions);
        const markdown = generateMarkdown(answers);
        await writeToFile('README.md', markdown);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Function call to initialize app
init();