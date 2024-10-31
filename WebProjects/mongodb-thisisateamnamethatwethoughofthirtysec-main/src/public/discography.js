/*
 * SWE2511 - MongoDB
 * Name: Alex Pearsall & Gavin Danner-Rivers
 * SECTION: 121
 */

const SERVER = "http://localhost:3000";

const addAlbum = async () => {
    const handleError = (error) => {
        const errorDisplay = document.getElementById("errorMessage");
        errorDisplay.innerText = error;
        errorDisplay.classList.remove("visually-hidden");
    }

    const handleSuccess = (response) => {
        document.getElementById("errorMessage").classList.add("visually-hidden");
        updateTable(response.result, false);
    }

    const album = document.getElementById("album").value;
    const artist = document.getElementById("artist").value;
    const year = document.getElementById("year").value;

    try {
        const response = await fetch(`${SERVER}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: album,
                artist: artist,
                year: year,
            })
        });
        if (!response.ok) {
            handleError(response.statusText);
        } else {
            const responseJSON = await response.json();
            handleSuccess(responseJSON);
        }
    } catch (error) {
        handleError(error.message);
    }
}

const search = async () => {
    const handleError = (error) => {
        const errorDisplay = document.getElementById("errorMessage");
        errorDisplay.innerText = error;
        errorDisplay.classList.remove("visually-hidden");
    }

    const handleSuccess = (response) => {
        document.getElementById("errorMessage").classList.add("visually-hidden");
        updateTable(response.result, true);
    }

    const searchType = document.getElementById("searchType").value;
    const filterTerm = document.getElementById("filterTerm").value;
    const requestData = `${searchType}=${filterTerm}`;

    try {
        const response = await fetch(`${SERVER}/${searchType}?${requestData}`);
        if (!response.ok) {
            handleError(response.statusText);
        } else {
            const responseJSON = await response.json();
            handleSuccess(responseJSON);
        }
    } catch (error) {
        handleError(error.message);
    }
}

/**
 * Updates a table with clean elements
 * @param data The data to be displayed
 * @param filtering A boolean which decides if the table should be filered
 * or not
 */
const updateTable = (data, filtering) => {
    if (filtering && data.length === 0) {
        const errorDisplay = document.getElementById("errorMessage");
        errorDisplay.innerText = "Nothing matches your search criteria";
        errorDisplay.classList.remove("visually-hidden");
        loadAlbums();
    } else if (!filtering) {
        document.getElementById("errorMessage").classList.add("visually-hidden");
        loadAlbums();
        const tableBody = document.getElementById("tbody");

        tableBody.append(createTable(data));
    } else {
        const tableBody = document.getElementById("tbody");
        tableBody.innerText = "";
        data.forEach((d) => {
            tableBody.append(createTable(d));
        });
    }
}

/**
 * Instead of creating the row exclusively with HTML, we create variables
 * which then gives us the ability to change the inner text inside them to
 * ensure the text inside is considered as text and not HTML elements.
 *
 * @param data The data to be shown
 * @returns {HTMLTableRowElement} An XSS safe row
 */
const createTable = (data) => {
    const newRow = document.createElement('tr');
    const titleCell = document.createElement('td');
    const artistCell = document.createElement('td');
    const yearCell = document.createElement('td');
    titleCell.innerText = data.title;
    artistCell.innerText = data.artist;
    yearCell.innerText = data.year;
    newRow.appendChild(titleCell);
    newRow.appendChild(artistCell);
    newRow.appendChild(yearCell);
    return newRow;
}

const showControls = () => {
    const val = document.getElementById("inputType").value;
    if (val === "search") {
        document.getElementById("add").classList.add("visually-hidden");
        document.getElementById("search").classList.remove("visually-hidden");
        document.getElementById("filter").classList.remove("visually-hidden");
    } else if (val === "addAlbum") {
        document.getElementById("errorMessage").classList.add("visually-hidden");
        document.getElementById("add").classList.remove("visually-hidden");
        document.getElementById("search").classList.add("visually-hidden");
        document.getElementById("filter").classList.add("visually-hidden");
    } else {
        document.getElementById("errorMessage").classList.add("visually-hidden");
        document.getElementById("add").classList.add("visually-hidden");
        document.getElementById("search").classList.add("visually-hidden");
        document.getElementById("filter").classList.add("visually-hidden");
    }
}

const loadAlbums = async () => {
    const handleError = (error) => {
        const errorDisplay = document.getElementById("errorMessage");
        errorDisplay.innerText = error;
        errorDisplay.classList.remove("visually-hidden");
    }

    const handleSuccess = (response) => {
        updateTable(response.result, true);
    }

    try {
        const response = await fetch(`${SERVER}/all`);
        if (!response.ok) {
            handleError(response.statusText);
        } else {
            const responseJSON = await response.json();
            handleSuccess(responseJSON);
        }
    } catch (error) {
        handleError(error.message);
    }
};


window.onload = () => {
    console.log("HERE");
    document.getElementById("inputType").onchange = showControls;
    document.getElementById("addButton").onclick = addAlbum;
    document.getElementById("filterButton").onclick = search;
    loadAlbums();
}
