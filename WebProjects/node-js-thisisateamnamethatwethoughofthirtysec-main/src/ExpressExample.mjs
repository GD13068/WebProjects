/*
 * Class: SWE2511 - Node.js
 * Name: Alex Pearsall & Gavin Danner-Rivers
 * Section: 121
 */

import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 8080;

app.use(express.static(__dirname + 'public'));

app.get('/example', (req, res) => {
    res.sendFile((__dirname + '\\public\\ExpressExample.html'));
})

app.get('/image', (req, res) => {
    res.sendFile((__dirname + '\\public\\MSOE_Logo.jpg'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})