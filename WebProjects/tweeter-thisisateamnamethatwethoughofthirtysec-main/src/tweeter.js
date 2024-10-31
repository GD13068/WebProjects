// Class: SWE2511 - Tweeter
// Name: Alex Pearsall and Gavin Danner-Rivers
// Class Section: 121

// TODO: add AND document functions to provide the tweeter functionality

const messageList = [];

const saveData = () => {
    const localStorage = window.localStorage;
    if (localStorage) {
        let messageData = "{";
        const tweetTable = document.getElementById("tweetTableBody");
        const tableRows = tweetTable.children;
        for (let row=0; row<tableRows.length; row++) {
            const rowCells = tableRows[row].children;
            const message = rowCells[0].innerText;
            const numberOfLikes = rowCells[2].innerText;
            const numberOfDislikes = rowCells[4].innerText;
            messageData += "\"row" + row + "\": {";
            messageData += "\"message\": \"" + message + "\",";
            messageData += "\"numberOfLikes\": \"" + numberOfLikes + "\",";
            messageData += "\"numberOfDislikes\": \"" + numberOfDislikes + "\"";
            messageData += "},"
        }
        messageData = messageData.substring(0, messageData.length-1);
        messageData += "}"
        if (messageData !== "}") {
            localStorage.setItem("data", JSON.parse(JSON.stringify(messageData)));
        }
    }
}

const getData = () => {
    const localStorage = window.localStorage;
    if (localStorage) {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                addRow(value.message, value.numberOfLikes, value.numberOfDislikes);
            }
        }
    }
}

const addRow = (message, numberOfLikes, numberOfDislikes) => {
    // Add tweet to table
    const tweetTable = document.getElementById("tweetTableBody");
    const newRow = document.createElement("TR");
    const messageCell = document.createElement("TD");
    messageCell.innerText = message;
    newRow.appendChild(messageCell);

    messageList.push(message);

    const numberOfLikesCell = document.createElement("TD");
    numberOfLikesCell.innerText = numberOfLikes;

    const likeCell = document.createElement("TD");
    const likeButton = document.createElement("BUTTON");
    likeButton.className = "btn btn-success";
    likeButton.innerText = "Like";
    likeButton.addEventListener("click", () => {
        numberOfLikesCell.innerText = "" + (parseInt(numberOfLikesCell.innerText) + 1);
        saveData();
    })

    likeCell.appendChild(likeButton);
    newRow.appendChild(likeCell);
    newRow.appendChild(numberOfLikesCell);

    const numberOfDislikesCell = document.createElement("TD");
    numberOfDislikesCell.innerText = numberOfDislikes;

    const dislikeCell = document.createElement("TD");
    const dislikeButton = document.createElement("BUTTON");
    dislikeButton.className = "btn btn-danger";
    dislikeButton.innerText = "Dislike";
    dislikeButton.addEventListener("click", () => {
        numberOfDislikesCell.innerText = "" + (parseInt(numberOfDislikesCell.innerText) + 1);
        saveData();
    })

    dislikeCell.appendChild(dislikeButton);
    newRow.appendChild(dislikeCell);
    newRow.appendChild(numberOfDislikesCell);

    tweetTable.appendChild(newRow);
}

window.onload = () => {
    getData();

    const tweetButton = document.getElementById("tweetButton");
    tweetButton.addEventListener("click", () => {
        // Get message
        const messageInput = document.getElementById("messageInput");
        let message = messageInput.value;

        // Validate input
        const errorMessage = document.getElementById("errormessage");
        if (message.length <= 0 || message.length > 25) {
            errorMessage.style.visibility = "visible";
            errorMessage.innerText = "Tweets must be between 1 and 25 characters."
        } else if (messageList.includes(message)) {
            errorMessage.style.visibility = "visible";
            errorMessage.innerText = "Tweets must be unique."
        } else {
            errorMessage.style.visibility = "hidden";
            errorMessage.innerText = "";
            addRow(message, "0", "0");
        }

        // Clear input field
        messageInput.value = "";

        //Save to local storage
        saveData();
    })
};
