/*
 * Class: SWE2511 - Blogger
 * Name: Gavin Danner-Rivers
 * Section: 121
 *
 * Blog Server
 */

import express from 'express';
import mongoose from 'mongoose';


/*** Helper functions for parameter validation ***/
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
);

/*
 * Checks if value is string that contains only letters and numbers
 */
const isAlphaNumeric = (text) => {
    const alphanumeric = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUBWXYZ".split('');
    return text
        .split('')                                                  // Split the text into characters
        .map((char) => { return alphanumeric.indexOf(char) >= 0; }) // Search for the character in the valid characters
        .every((element) => { return element === true; })   // Every character must be found
};

/*
 * Checks if value is string that starts with a letter
 */
const startsWithLetter = (text) => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUBWXYZ".split('');
    return letters.indexOf(text[0]) >= 0;
};


// Setup mongodb connection
// ****** NOTE THIS WILL FAIL IF mongod.exe IS NOT RUNNING ******
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog');
} catch (error) {
    console.log(`Unable to connect to mongodb: ${error}`);
    process.exit();
}

// Set up a schema to describe the format/structure of the records
const postSchema = new mongoose.Schema({'content': String, 'hashtag': String, 'date': Date});

// Set up a model to bind a collection to the schema.
const postModel = mongoose.model('posts', postSchema);

/*** EXPRESS INITIALIZATION ***/
const app = new express();

// Use JSON Middleware to interpret request body as JSON
app.use(express.json());

// Use static middleware for static front-end hosting
app.use(express.static("public", { index: "blogger.html" }));


/*** ADDITIONAL FUNCTIONS FOR API END-POINTS ***/
/*
Endpoint for getting all the posts from the database
 */
app.get("/posts", (request, response) => {
    postModel.find({})
        .then((postsItems) => {
            response.json({
                status: "success",
                posts: postsItems
            });
        })
        .catch((error) => {
            response.json({
                status: "error",
                message: `Database error:  ${error.message}`
            });
        });
});

/*
Endpoint for adding a post to the database
 */
app.post("/post", (request, response) => {
    if (request.body.content === undefined && !isNonEmptyString(request.body.content)) {
        response.status(400).json({
            status: "error",
            message: "Post content required",
        });
    } else if ((typeof request.body.content) !== "string") {
        response.status(400).json({
            status: "error",
            message: "Post content must consist of only text characters",
        });
    } else {
        // Content is valid
        if (request.body.hashtag !== undefined && isNonEmptyString(request.body.hashtag)) {
            // Hashtag is present
            if (request.body.hashtag[0] !== "#") {
                response.status(400).json({
                    status: "error",
                    message: "Missing # symbol",
                });
            } else if (!isAlphaNumeric(request.body.hashtag.substring(1))) {
                response.status(400).json({
                    status: "error",
                    message: "Hashtags must contain only alphanumeric characters"
                });
            } else if (!startsWithLetter(request.body.hashtag.substring(1))) {
                response.status(400).json({
                    status: "error",
                    message: "Hashtags must start with a letter"
                })
            } else {
                // Hashtag is valid
                const newPost = new postModel({
                    content: request.body.content,
                    hashtag: request.body.hashtag,
                    date: Date.now(),
                });

                newPost.save()
                    .then((savedPost) => {
                        response.json({
                            status: "success",
                            post: savedPost,
                        });
                    })
                    .catch((error) => {
                        response.json({
                            status: "error",
                            message: `Database error: ${error.message}`
                        });
                    });
            }
        } else {
            // Hashtag is not present
            const newPost = new postModel({
                content: request.body.content,
                date: Date.now(),
            });

            newPost.save()
                .then((savedPost) => {
                    response.json({
                        status: "success",
                        post: savedPost,
                    });
                })
                .catch((error) => {
                    response.json({
                        status: "error",
                        message: `Database error: ${error.message}`
                    });
                });
        }
    }
});

/*
Endpoint for deleting a post from the database
 */
app.delete("/post", (request, response) => {
    if (!isNonEmptyString(request.query.id)) {
        response.status(400).json({
            status: "error",
            message: "ID is required",
        });
    } else {
        postModel.findByIdAndDelete(request.query.id)
            .then((deletedPost) => {
                response.json({
                    status: "success",
                    post: deletedPost,
                });
            })
            .catch((error) => {
                response.json({
                    status: "error",
                    message: `Database error: ${error.message}`
                });
            });
    }
});

app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});