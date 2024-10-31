/*
 * Class: SWE2511 - Text File Manager
 * Name: Gavin Danner-Rivers
 * Section: 121
 *
 * Text File Manager API Functions
 */

// Helper variables for server endpoints
const server = 'localhost';
const getFilesURL = `http://${server}:3000/files`;
const getFileURL = `http://${server}:3000/file`;
const createFileURL = `http://${server}:3000/file`;
const updateFileURL = `http://${server}:3000/file`;
const deleteFileURL = `http://${server}:3000/file`;

/*
 * getFiles - Calls GET endpoint to retrieve current items
 *
 * Return an array containing the string names of each file
 * Throws an Error containing the error message on error
 */
const getFiles = async() => {
    // Send the request to the server
    const response = await fetch(getFilesURL, {
        method: "GET"
    });

    // Check for errors
    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const responseData = await response.json();
    if (responseData.status === "error") {
        throw new Error(responseData.message);
    }

    // Return file list
    return responseData.files;
};

/*
 * getFileData - Calls GET endpoint to retrieve the contents of the file
 *
 * Returns the file data stored by the server for the file
 * Throws an Error containing the error message on error
 */
const getFileData = async(fileName) => {
    // Send the request to the server
    const response = await fetch(`${getFileURL}?name=${fileName}`, {
        method: "GET"
    });

    // Check for errors
    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const responseData = await response.json();
    if (responseData.status === "error") {
        throw new Error(responseData.message);
    }

    // Return the file data
    return responseData.data;
}

/*
 * createNewFile - Calls POST endpoint to create a new file
 *
 * Returns the string name of the created file
 * Throws an Error containing the error message on error
 */
const createNewFile = async(fileName) => {
    // Send the request to the server
    const response = await fetch(`${createFileURL}?name=${fileName}`, {
        method: "POST"
    });

    // Check for errors
    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const responseData = await response.json();
    if (responseData.status === "error") {
        throw new Error(responseData.message);
    }

    // Return the file name
    return responseData.name;
}

/*
 * saveFileData - Calls PUT endpoint to save a file
 *
 * Returns the saved file data
 * Throws an Error containing the error message on error
 */
const saveFileData = async(fileName, fileData) => {
    // Send the request to the server
    const response = await fetch(`${updateFileURL}?name=${fileName}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: fileData
    });

    // Check for errors
    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const responseData = await response.json();
    if (responseData.status === "error") {
        throw new Error(responseData.message);
    }

    // Return the file data
    return responseData.data;
}

/*
 * deleteFileData - Calls DELETE endpoint to delete a file
 *
 * Returns nothing
 * Throws an Error containing the error message on error
 */
const deleteFileData = async(fileName) => {
    // Send the request to the server
    const response = await fetch(`${deleteFileURL}?name=${fileName}`, {
        method: "DELETE"
    });

    // Check for errors
    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const responseData = await response.json();
    if (responseData.status === "error") {
        throw new Error(responseData.message);
    }
}