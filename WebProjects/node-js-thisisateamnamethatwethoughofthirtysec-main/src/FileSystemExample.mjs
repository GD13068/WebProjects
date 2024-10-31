/*
Class: SWE2511 - Node.js
Name: Alex Pearsall & Gavin Danner-Rivers
Section: 121
*/

import * as fs from 'node:fs';
import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a File Name: ", (fileName) => {

    fs.readFile(fileName, 'utf8', (err, fileContent) => {
        if (err) {
            console.error('Error reading the file:', err);
        } else {
            const stats = fs.statSync(fileName)
            const fileSize = stats.size;

            if (fileSize < 50) {
                console.log(fileContent);
            } else {
                const first50Bytes = fileContent.slice(0, 50);
                console.log(first50Bytes + '(...)');
            }
        }
        rl.close();
    });
});