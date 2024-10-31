/*
 * Class: SWE2511 - Blogger
 * Name: Gavin Danner-Rivers
 * Section: 121
 *
 * Blogger client user interface routines
 */

const hashtagList = [];

/*
Delete the post whose delete button has been pressed
 */
const deleteSelectedPost = async (e) => {
    const target = e.target;

    const inputError = document.getElementById("inputError");
    inputError.innerText = "";

    try {
        const deletedPost = await deletePost(target.postId);
        if (document.getElementsByClassName(deletedPost.hashtag).length === 1) {
            hashtagList.splice(hashtagList.indexOf(deletedPost.id), 1);
        }
    } catch (error) {
        inputError.innerText = `Unexpected error: ${error.name}: ${error.message}`;
    }

    document.getElementById("postsList").replaceChildren();
    loadPosts();
};

/*
Add a post to the post list on the document
 */
const addPostToList = (content, hashtag, date, id) => {
    const postsList = document.getElementById("postsList");

    const newPostDiv = document.createElement("DIV");
    newPostDiv.className = "post";

    const newPostHeaderDiv = document.createElement("DIV");
    newPostHeaderDiv.className = "postHeaderDiv";

    const newPostHeader = document.createElement("H3");
    newPostHeader.innerText = `Posted on ${date.toLocaleString("en-US")}`;

    const newPostDeleteButton = document.createElement("BUTTON");
    newPostDeleteButton.className = "btn btn-danger";
    newPostDeleteButton.innerText = "Delete";
    newPostDeleteButton.postId = id;
    newPostDeleteButton.onclick = deleteSelectedPost;

    newPostHeaderDiv.append(newPostHeader, newPostDeleteButton);

    const newPostContentDiv = document.createElement("DIV");

    if (hashtag !== undefined) {
        const newPostHashtag = document.createElement("P");
        newPostHashtag.className = "postHashtag";
        newPostHashtag.innerText = hashtag;

        newPostContentDiv.appendChild(newPostHashtag);

        if (!hashtagList.includes(hashtag)) {
            hashtagList.push(hashtag);
        }

        newPostDiv.classList.add(hashtag);
    } else {
        newPostDiv.classList.add("noHashtag");
    }

    const newPostContent = document.createElement("P");
    newPostContent.innerText = content;

    newPostContentDiv.appendChild(newPostContent);

    newPostDiv.append(newPostHeaderDiv, newPostContentDiv);

    document.getElementById("noPostsMessage").style.display = "none";
    document.getElementById("filterInput").disabled = false;

    postsList.prepend(newPostDiv);
};

/*
Load all the posts from the server
 */
const loadPosts = async () => {
    try {
        const results = await getPosts();

        if (results.posts.length !== 0) {
            document.getElementById("noPostsMessage").style.display = "none";
            document.getElementById("filterInput").disabled = false;
        } else {
            document.getElementById("noPostsMessage").style.display = "block";
            document.getElementById("filterInput").disabled = true;
        }

        results.posts.forEach((post) => {
            addPostToList(post.content, post.hashtag, new Date(post.date), post._id);
        });
    } catch (error) {
        const inputError = document.getElementById("inputError");
        inputError.innerText = `Unexpected error: ${error.name}: ${error.message}`;
    }
};

/*
Add a new post to the server and the post list
 */
const addPost = async () => {
    const messageInput = document.getElementById("messageInput");
    const hashtagInput = document.getElementById("hashtagInput");

    const inputError = document.getElementById("inputError");
    inputError.innerText = "";

    const postContent = messageInput.value;
    if (!isNonEmptyString(postContent)) {
        inputError.innerText = "Unexpected error: Post content required";
    } else if ((typeof postContent) !== "string") {
        inputError.innerText = "Unexpected error: Post content must consist of only text characters";
    } else {
        // Content is valid
        const postHashtag = hashtagInput.value;
        if (isNonEmptyString(postHashtag)) {
            // Hashtag is present
            if (postHashtag[0] !== "#") {
                inputError.innerText = "Unexpected error: Missing # symbol";
            } else if (!isAlphaNumeric(postHashtag.substring(1))) {
                inputError.innerText = "Unexpected error: Hashtags must contain only alphanumeric characters";
            } else if (!startsWithLetter(postHashtag.substring(1))) {
                inputError.innerText = "Unexpected error: Hashtags must start with a letter";
            } else {
                // Hashtag is valid
                try {
                    document.getElementById("messageInput").disabled = true;
                    document.getElementById("hashtagInput").disabled = true;
                    document.getElementById("postButton").disabled = true;

                    const results = await createPost(postContent, postHashtag);

                    document.getElementById("messageInput").disabled = false;
                    document.getElementById("hashtagInput").disabled = false;
                    document.getElementById("postButton").disabled = false;

                    addPostToList(results.content, results.hashtag, new Date(results.date), results._id);
                } catch (error) {
                    document.getElementById("messageInput").disabled = false;
                    document.getElementById("hashtagInput").disabled = false;
                    document.getElementById("postButton").disabled = false;

                    inputError.innerText = `Unexpected error: ${error.name}: ${error.message}`;
                }
            }
        } else {
            // Hashtag is not present
            try {
                document.getElementById("messageInput").disabled = true;
                document.getElementById("hashtagInput").disabled = true;
                document.getElementById("postButton").disabled = true;

                const results = await createPost(postContent, undefined);

                document.getElementById("messageInput").disabled = false;
                document.getElementById("hashtagInput").disabled = false;
                document.getElementById("postButton").disabled = false;

                addPostToList(results.content, results.hashtag, new Date(results.date), results._id);
            } catch (error) {
                document.getElementById("messageInput").disabled = false;
                document.getElementById("hashtagInput").disabled = false;
                document.getElementById("postButton").disabled = false;

                inputError.innerText = `Unexpected error: ${error.name}: ${error.message}`;
            }
        }
    }
};

/*
Filter the posts for matching hashtags
 */
const filter = () => {
    const filterInput = document.getElementById("filterInput");

    let filterString = filterInput.value.toLowerCase();

    const matchingElements = document.getElementsByClassName("noHashtag");

    Array.from(matchingElements).forEach((element) => {
        if (filterString.length !== 0) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });

    if (filterString[0] !== "#") {
        filterString = "#" + filterString;
    }

    for (let i=0; i<hashtagList.length; i++) {
        if (!hashtagList[i].toLowerCase().startsWith(filterString)) {
            const matchingElements = document.getElementsByClassName(hashtagList[i]);

            Array.from(matchingElements).forEach((element) => {
                element.style.display = "none";
            });
        } else {
            const matchingElements = document.getElementsByClassName(hashtagList[i]);

            Array.from(matchingElements).forEach((element) => {
                element.style.display = "block";
            });
        }
    }
};

window.onload = () => {
    document.getElementById("postButton").onclick = addPost;
    document.getElementById("filterInput").onkeyup = filter;
    loadPosts();
};