/*
Class: SWE2511 - Node.js
Name: Alex Pearsall & Gavin Danner-Rivers
Section: 121
*/

import url from 'node:url';
import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a URL: ", (answer1) => {
    let q = url.parse(answer1, true);
    let qdata = q.query;
    console.log(qdata.month);
    console.log(qdata.year);
});