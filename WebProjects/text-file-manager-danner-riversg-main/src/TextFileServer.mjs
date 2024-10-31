/*
 * Class: SWE2511 - Text File Manager
 * Name: Gavin Danner-Rivers
 * Section: 121
 */

import express from "express";
import fs from "node:fs";

const app = new express();

// Use text middleware to interpret request body as text
app.use(express.text());

// Use static middleware for static front-end hosting
app.use(express.static("public", { index: "TextFileManager.html" }));

// Helper functions for parameter validation
/*
 * Checks if a value is defined
 */
const isDefined = (value) => (
    value !== undefined && value !== null && typeof(value) !== 'undefined'
);

/*
 * Checks if value is defined, is a string, and has a length > 0
 */
const isNonEmptyString = (value) => (
    isDefined(value) && typeof(value) === "string" && value.length > 0
)

// Location to store files
const filesDir = `files`;

/*
 * Function handler for the GET /files API endpoint
 */
app.get("/files", (request, response) => {
    try {
        // Try to get file names
        let fileArray = fs.readdirSync(filesDir);

        // Success response
        response.json({
            status: "success",
            files: fileArray
        });
    } catch (e) {
        // Error response
        response.json({
            status: "error",
            message: e.message
        });
    }
});

/*
 * Function handler for the GET /file API endpoint
 */
app.get("/file", (request, response) => {
    // Make sure name parameter is present
    let fileName = request.query.name;
    if (!isNonEmptyString(fileName)) {
        response.json({
            status: "error",
            message: "Name must be a non empty string"
        });
    }

    try {
        // Try to get the file content
        let fileData = fs.readFileSync(filesDir + "/" + fileName);

        // Success response
        response.json({
            status: "success",
            name: fileName,
            data: fileData.toString()
        });
    } catch (e) {
        // Error response
        response.json({
            status: "error",
            message: e.message
        });
    }
});

/*
 * Function handler for the POST /file API endpoint
 */
app.post("/file", (request, response) => {
    // Make sure name parameter is present
    let fileName = request.query.name;
    if (!isNonEmptyString(fileName)) {
        response.json({
            status: "error",
            message: "Name must be a non empty string"
        });
    }

    try {
        // Check if a file already exists with that name
        let exists = fs.existsSync(filesDir + "/" + fileName);

        // Try to create the file if it doesn't exist
        if (!exists) {
            fs.writeFileSync(filesDir + "/" + fileName, "");

            // Success message
            response.json({
                status: "success",
                name: fileName,
            });
        } else {
            response.json({
                status: "error",
                message: "A file already exists with this name"
            });
        }
    } catch (e) {
        // Error message
        response.json({
            status: "error",
            message: e.message
        });
    }
});

/*
 * Function handler for the PUT /file API endpoint
 */
app.put("/file", (request, response) => {
    // Make sure name parameter is present
    let fileName = request.query.name;
    if (!isNonEmptyString(fileName)) {
        response.json({
            status: "error",
            message: "Name must be a non empty string"
        });
    }

    try {
        // Try to write the file data
        fs.writeFileSync(filesDir + "/" + fileName, request.body);

        // Success message
        response.json({
            status: "success",
            name: fileName,
            data: request.body
        });
    } catch (e) {
        // Error message
        response.json({
            status: "error",
            message: e.message
        });
    }
});

/*
 * Function handler for the DELETE /file API endpoint
 */
app.delete("/file", (request, response) => {
    // Make sure name parameter is present
    let fileName = request.query.name;
    if (!isNonEmptyString(fileName)) {
        response.json({
            status: "error",
            message: "Name must be a non empty string"
        });
    }

    try {
        // Try to delete the file
        fs.unlinkSync(filesDir + "/" + fileName);

        // Success message
        response.json({
            status: "success",
            name: fileName,
        });
    } catch (e) {
        // Error message
        response.json({
            status: "error",
            message: e.message
        });
    }
});

// Set the server to listen on port 3000
app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});