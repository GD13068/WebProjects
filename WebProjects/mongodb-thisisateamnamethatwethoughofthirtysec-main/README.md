## Introduction

In this assignment, you will experiment with an existing web application that uses a MongoDB.

For this assignment, you may be asked to answer questions and/or write some code.  Provide complete answers to all written questions:  When asked for examples, be specific.  Submit your answers in a document separate from code.

Work on the assignment is to be done with ***your assigned group***.  You are welcome to collaborate with class members, but the submitted assignment must be the work of only your group.

## Background and References

The discography web application front-end consists of a user interface displaying music albums.  The back-end server uses a MongoDB database that, when given enough data entry time, will store a complete listing of all the music albums owned by Professor Jones.  It has been written in Express and Mongoose, using callbacks to service the database requests.

## Install MongoDB.js

Follow the instructions on the [MongoDB: Installation and Setup](InstallMongoDB.md)

## Setting up the Discography Database

1. Provided in your repository are the source files for the discography web application in the ```src``` directory.

2. Within the ```src``` directory is one additional directory ```public``` and a file ```discographyServer.mjs```.
   - ```public``` - contains the files for the discography web application client
   - ```discographyServer.mjs``` - contains the code for the server

3. Open and view the [```src/discographyServer.mjs```](src/discographyServer.mjs) file.

4. Start your MongoDB server (```mongod.exe```) in a Command Prompt window

5. In a ***second command prompt window***, use the MongoDB tool (```mongorestore```) to import the saved albums' database (```albums.bson```) into your MongoDB datastore:

   ```text
   "C:\Program Files\MongoDB\Tools\100\bin\mongorestore.exe" --db=discography "<PATH TO albums.bson>"
   ```

   ***NOTE:*** replace ```<PATH TO albums.bson>``` with the absolute path (starting with C:\) to the location of your ```albums.bson``` file.
   <br><br>
   ***NOTE:*** Make sure to place the path ```mongorestore.exe``` in double quotes that are separate from the double quotes for the ```<PATH TO albums.bson>```.
   <br><br>
   For example, if your ```albums.bson``` is located in: ```C:\Users\Me\WebStormProjects\MongoDB\albums.bson``` your command would be:

   ```text
   "C:\Program Files\MongoDB\Tools\100\bin\mongorestore.exe" --db=discography "C:\Users\Me\WebStormProjects\MongoDB\albums.bson"
   ```

   If all worked correctly you should see a message indicating that records were restored to the database.

6. Start the MongoDB shell program (```mongosh.exe```)

7. Verify the database has been imported by checking the list of existing databases:

   ```text
   test> show dbs
   admin        40.00 KiB
   config       12.00 KiB
   discography   8.00 KiB
   local        40.00 KiB
   ```
   
   Among others, you should see the ```discography``` database listed.

8. In your WebStorm project, install package dependencies:  

   ```text
   npm install
   ```
   
   ***NOTE:*** A ```package.json``` file has already been provided for you with the needed dependencies for ```express``` and ```mongoose```.

9. Start the server and click the link displayed in the console to open the page in a browser window.

## Working with the Discography Server

### The Discography Client Interface

Take a moment to familiarize yourself with the client interface.  Then answer the following questions.

1. Search for the albums released in 1977:
   1. How does the interface change when you select ```Search```? 
   2. How many items are in the table after the search completes? 
   3. What happens to the table if your search field is empty?

2. In ```src\public\discography.css```, explain what the following blocks of code are doing ***AND*** on what elements they are applied to:
   1. The ```table thead tr th``` block
   2. The ```.height-limit``` block
   3. The ```.header``` block

3. Notice how the table header behaves as you scroll up and down:
   1. What CSS property causes this to happen?
   2. How does the property work?

### The Discography Client Code

Take a moment to familiarize yourself with the client JavaScript code.  Then answer the following questions.

1. In ```src\public\discography.js```:
    1. Why do we need to assign a function to ```window.onload```?
    2. What the function doing?
    3. What would happen if the function was not there?

2. In ```src\public\discography.js```, in the ```addAlbum``` function, from where is the script getting the values for the new entry?

3. (6 Points) In ```src\public\discography.js```, in the ```search``` function:
    1. Explain what ```document.getElementById("searchType").value;``` does.
       How does it know which value to return?
    2. When we searched for albums released in 1977, what was the value stored in ```requestData```?<br/>
       What is done with that value when the ```GET``` request is called?
    3. How is the appropriate server end-point selected?

### The Discography Server Code

Take a moment to familiarize yourself with the serer JavaScript code.  Then answer the following questions.

In ```src\directoryServer.mjs```:

1. Explain what the code is doing on lines 10-13.
2. Explain what the code is doing on lines 14-15. 
3. Explain what the code is doing on lines 17-25.

### Error Handling and Security

In ```src\directoryServer.mjs```, all the end-points have been implemented using mongoose, however they are missing error handling.  Missing error handling can cause the server to crash when given input that is not valid.  For example, if the user gives a string for a year instead of a number.

***NOTE:*** missing error handling is ***NOT*** a good practice.  User input sent to a server should ***NEVER*** cause the server to crash.
   
1. Add error handling to all 5 of endpoints (indicated in the file with TODO comments).  Don't forget the 5th one in the post route for ```/add```.

2. Test your error handlers by providing 'bad' input to the search and add functions.  Include your test inputs in your submission.  Make sure your tests adequately test all the server endpoints that retrieve user input. 

Cross site scripting attacks allow a malicious user to execute arbitrary JavaScript on another user's computer.  Explore the ```updateTable``` function in the ```src\public\discography.js```.

1. From what you discovered provide a set of steps that a malicious user could do to store (add) an album to the database that when loaded on another user's computer could execute a cross site scripting attack.
    - Be specific in your steps
    - Provide ***ALL*** input strings that the malicious user must type ***AND*** where to type them.

2. Cross site scripting attacks can be prevented.  Update the ```updateTable``` function to fix the code so that it no longer allows for a cross site scripting attack.  The table behavior should still function as it did before making the fix.

## Deliverables

When you are ready to submit your assignment prepare your repository:

- Make sure your name, assignment name, and section number are in comments on ALL changed HTML, CSS, and JS file(s).
- Make sure you have completed all activities and answered all questions.
- Make sure you cite your sources for all research.
- Make sure your assignment code is commented thoroughly.
- Include in your submission, a set of suggestions for improvement and/or what you enjoyed about this assignment.
- Make sure all files are committed and pushed to the main branch of your repository.

***NOTE***: Do not forget to 'add', 'commit', and 'push' all new files and changes to your repository before submitting.

### Additional Submission Notes

If/when using resources from material outside what was presented in class (e.g., Google search, Stack Overflow, etc.) document the resource used in your submission.  Include exact URLs for web pages where appropriate.

NOTE: Sources that are not original research and/or unreliable sources are not to be used.  For example:

- Wikipedia is not a reliable source, nor does it present original research: [https://en.wikipedia.org/wiki/Wikipedia:Wikipedia_is_not_a_reliable_source](https://en.wikipedia.org/wiki/Wikipedia:Wikipedia_is_not_a_reliable_source)
- ChatGPT is not a reliable source: [https://thecodebytes.com/is-chatgpt-reliable-heres-why-its-not/](https://thecodebytes.com/is-chatgpt-reliable-heres-why-its-not/)

For more information, please see the [MSOE CS Code of Conduct](https://msoe.s3.amazonaws.com/files/resources/swecsc-computing-code-of-conduct.pdf).

To submit, copy the URL for your repository and submit the link to Canvas.

## Grading Criteria

- (5 Points) Submitted files follow submission guidelines
   - Only the requested files were submitted
   - Files are contain name, assignment, section
   - Sources outside of course material are cited
- (5 Points) Suggestions
   - List of suggestions for improvement and/or what you enjoyed about this assignment
- (10 Points) Code Structure
   - Readable code/file structure
   - Code is well documented
- (20 Points) Completion of The Discography Client Interface 
- (20 Points) Completion of The Discography Client Code
- (10 Points) Completion of The Discography Server Code
- (30 Points) Completion of Error Handling and Security

## Acknowledgments

This assignment was originally created by Professor Jones
