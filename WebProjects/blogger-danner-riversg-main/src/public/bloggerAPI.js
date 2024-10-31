/*
 * Class: SWE2511 - Blogger
 * Name: Gavin Danner-Rivers
 * Section: 121
 *
 * Blogger API Functions
 */

const server = 'localhost';
const getPostsURL = `http://${server}:3000/posts`;
const createPostURL = `http://${server}:3000/post`;
const deletePostURL = `http://${server}:3000/post`;

/*
 * getPosts - Calls GET endpoint to retrieve blog posts
 */
const getPosts = async () => {
    const response = await fetch(getPostsURL);

    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const results = await response.json();
    if (results.status === "error") {
        throw new Error(results.message);
    }

    return results;
};

/*
 * createPost - Calls POST create endpoint to create a new blog post
 */
const createPost = async (post, hashtag) => {
    const response = await fetch(createPostURL, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            content: post,
            hashtag: hashtag
        })
    });

    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const results = await response.json();
    if (results.status === "error") {
        throw new Error(results.message);
    }

    return results.post;
};

/*
 * deletePost - Calls DELETE post endpoint to delete a blog post
 */
const deletePost = async (id) => {
    const response = await fetch(`${deletePostURL}?id=${id}`, {
        method: "DELETE"
    });

    if (response.ok !== true) {
        throw new Error(response.statusText);
    }

    const results = await response.json();
    if (results.status === "error") {
        throw new Error(results.message);
    }

    return results.post;
};