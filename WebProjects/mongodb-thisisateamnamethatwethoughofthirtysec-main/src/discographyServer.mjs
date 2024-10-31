/*
 * SWE2511 - MongoDB
 * Name: Alex Pearsall & Gavin Danner-Rivers
 * SECTION: 121
 */

import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
app.use(express.static("public", {index: "discography.html"}));
app.use(express.json());

// Connect to the MongoDB
try {
    await mongoose.connect('mongodb://127.0.0.1/discography');
} catch (error) {
    console.log(`Unable to connect to mongodb: ${error}`);
    process.exit();
}
const discographySchema = new mongoose.Schema({'title': String, 'artist': String, 'year': Number});
const discographyModel = mongoose.model('albums', discographySchema);

//Gets the main database
app.get("/all", (req, res) => {
    discographyModel.find({})
        .then((albums) => {
            res.json({
                status: "success",
                result: albums,
            });
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: `Database Error: ${err.message}`
            });
        });
});

//Gets the artist inside the database
app.get("/artist", (req, res) => {
    discographyModel.find({'artist': `${req.query.artist}`})
        .then((artists) => {
            res.json({
                status: "success",
                result: artists,
            });
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: `Database Error: ${err.message}`
            });
        });
});

//Gets the title inside the database
app.get("/title", (req, res) => {
    discographyModel.find({'title': `${req.query.title}`})
        .then((titles) => {
            res.json({
                status: "success",
                result: titles,
            });
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: `Database Error: ${err.message}`
            });
        });
});

//Gets the year in the database
app.get("/year", (req, res) => {
    discographyModel.find({'year': `${req.query.year}`})
        .then((years) => {
            res.json({
                status: "success",
                result: years,
            });
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: `Database Error: ${err.message}`
            });
        });
});

//Adds an album to the database
app.post("/add", (req, res) => {
    if (req.body.title === undefined || req.body.artist === undefined || req.body.year === undefined) {
        res.status(400).json({
            status: "error",
            message: "All fields must be present",
        });
    } else if (req.body.title.length === 0 || req.body.artist.length === 0 || req.body.year.length === 0) {
        res.status(400).json({
            status: "error",
            message: "All fields must be filled out",
        });
    } else {
        const year = req.body.year;
        if (isNaN(year) || year < 1900) {
            res.json({
                status: "error",
                message: "Invalid year",
            });
        } else {
            const newAlbum = new discographyModel({
                title: req.body.title,
                artist: req.body.artist,
                year: req.body.year,
            });

            newAlbum.save()
                .then((savedAlbum) => {
                    res.json({
                        status: "success",
                        result: savedAlbum,
                    });
                })
                .catch((err) => {
                    res.json({
                        status: "error",
                        message: `Database Error: ${err.message}`
                    });
                });
        }
    }
});
