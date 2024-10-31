// Class: SWE2511 - Node.js
// Name: Alex Pearsall and Gavin Danner-Rivers
// Class Section: 121

// Import readline
import * as readline from 'node:readline';

// Setup readline
const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
});

// Ask question and give response
rl.question('What is your name? ', name => {
    console.log(`Hello ${name}.`);
    rl.close();
});