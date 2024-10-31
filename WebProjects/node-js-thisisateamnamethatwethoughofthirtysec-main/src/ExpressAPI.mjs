// Class: SWE2511 - Node.js
// Name: Alex Pearsall and Gavin Danner-Rivers
// Class Section: 121

// Import express
import express, {request, response} from "express";

// Setup express
const app = new express();

// Add functionality
app.get("/add", (request, response) => {
    let a = request.query.a;
    let b = request.query.b;
    let parsedA = parseFloat(a);
    let parsedB = parseFloat(b);
    if (a === undefined && b === undefined) {
        response.json({"error": "Parameter a and b are required."});
    } else if (a === undefined) {
        if (Number.isNaN(parsedB)) {
            response.json({"b": b, "error": "Parameter a is required."});
        } else {
            response.json({"b": parsedB, "error": "Parameter a is required."});
        }
    } else if (b === undefined) {
        if (Number.isNaN(parsedA)) {
            response.json({"a": a, "error": "Parameter b is required."});
        } else {
            response.json({"a": parsedA, "error": "Parameter b is required."});
        }
    } else {
        if (Number.isNaN(parsedA) && Number.isNaN(parsedB)) {
            response.json({"a": a, "b": b, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedA)) {
            response.json({"a": a, "b": parsedB, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedB)) {
            response.json({"a": parsedA, "b": b, "error": "Invalid input value."});
        } else {
            response.json({"a": parsedA, "b": parsedB, "result": parsedA+parsedB});
        }
    }
})

// Subtract functionality
app.get("/subtract", (request, response) => {
    let a = request.query.a;
    let b = request.query.b;
    let parsedA = parseFloat(a);
    let parsedB = parseFloat(b);
    if (a === undefined && b === undefined) {
        response.json({"error": "Parameter a and b are required."});
    } else if (a === undefined) {
        if (Number.isNaN(parsedB)) {
            response.json({"b": b, "error": "Parameter a is required."});
        } else {
            response.json({"b": parsedB, "error": "Parameter a is required."});
        }
    } else if (b === undefined) {
        if (Number.isNaN(parsedA)) {
            response.json({"a": a, "error": "Parameter b is required."});
        } else {
            response.json({"a": parsedA, "error": "Parameter b is required."});
        }
    } else {
        if (Number.isNaN(parsedA) && Number.isNaN(parsedB)) {
            response.json({"a": a, "b": b, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedA)) {
            response.json({"a": a, "b": parsedB, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedB)) {
            response.json({"a": parsedA, "b": b, "error": "Invalid input value."});
        } else {
            response.json({"a": parsedA, "b": parsedB, "result": parsedA-parsedB});
        }
    }
})

// Multiply functionality
app.get("/multiply", (request, response) => {
    let a = request.query.a;
    let b = request.query.b;
    let parsedA = parseFloat(a);
    let parsedB = parseFloat(b);
    if (a === undefined && b === undefined) {
        response.json({"error": "Parameter a and b are required."});
    } else if (a === undefined) {
        if (Number.isNaN(parsedB)) {
            response.json({"b": b, "error": "Parameter a is required."});
        } else {
            response.json({"b": parsedB, "error": "Parameter a is required."});
        }
    } else if (b === undefined) {
        if (Number.isNaN(parsedA)) {
            response.json({"a": a, "error": "Parameter b is required."});
        } else {
            response.json({"a": parsedA, "error": "Parameter b is required."});
        }
    } else {
        if (Number.isNaN(parsedA) && Number.isNaN(parsedB)) {
            response.json({"a": a, "b": b, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedA)) {
            response.json({"a": a, "b": parsedB, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedB)) {
            response.json({"a": parsedA, "b": b, "error": "Invalid input value."});
        } else {
            response.json({"a": parsedA, "b": parsedB, "result": parsedA*parsedB});
        }
    }
})

// Divide functionality
app.get("/divide", (request, response) => {
    let a = request.query.a;
    let b = request.query.b;
    let parsedA = parseFloat(a);
    let parsedB = parseFloat(b);
    if (a === undefined && b === undefined) {
        response.json({"error": "Parameter a and b are required."});
    } else if (a === undefined) {
        if (Number.isNaN(parsedB)) {
            response.json({"b": b, "error": "Parameter a is required."});
        } else {
            response.json({"b": parsedB, "error": "Parameter a is required."});
        }
    } else if (b === undefined) {
        if (Number.isNaN(parsedA)) {
            response.json({"a": a, "error": "Parameter b is required."});
        } else {
            response.json({"a": parsedA, "error": "Parameter b is required."});
        }
    } else {
        if (Number.isNaN(parsedA) && Number.isNaN(parsedB)) {
            response.json({"a": a, "b": b, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedA)) {
            response.json({"a": a, "b": parsedB, "error": "Invalid input value."});
        } else if (Number.isNaN(parsedB)) {
            response.json({"a": parsedA, "b": b, "error": "Invalid input value."});
        } else {
            if (parsedB === 0) {
                response.json({"a": parsedA, "b": parsedB, "error": "Parameter b cannot be 0."});
            } else {
                response.json({"a": parsedA, "b": parsedB, "result": parsedA / parsedB});
            }
        }
    }
})

// Default
app.get("*", (request, response) => {
    response.sendStatus(404);
})

// Listen on port 3000
app.listen(3000, () => {
    console.log("Listening on https://localhost:3000");
})