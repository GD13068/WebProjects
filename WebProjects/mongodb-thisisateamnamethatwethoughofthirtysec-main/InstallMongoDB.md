## Install MongoDB Server

1. Go to the MongoDB community download page: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) and download the current version of the MongoDB server.<br>
   ***NOTE:*** Make sure you select 'msi' for the package type.

2. Run the installer and follow the prompts accepting the license agreement

3. Choose the Complete installation

4. When asked Service Configuration ***UNCHECK*** the "Install MongoDB as a Service" checkbox

5. On the next screen it will ask if you want to install MongoDB Compass, a graphical user interface for MongoDB.  We will not be using it, but feel free to install it if you'd like.

6. When you reach the last screen click "Install" and the installer will copy all the needed files for the MongoDB server.

## Setting up the MongoDB Data Store

MongoDB requires a directory on your PC to store the database data.  MongoDB defaults this to ```C:\data\db```.  You can use this directory or another of your choice.  In either case the directory must be created before starting the MongoDB server.

## Installing MongoDB Shell

Download and install the MongoDB shell:
[https://www.mongodb.com/docs/mongodb-shell/](https://www.mongodb.com/docs/mongodb-shell/) <br/>
The default package format available for this is a 'zip'.  It is recommended to use the 'msi' installer.  You'll have to select 'msi' from the dropdown menu.  Also, it is recommended to ***UNCHECK*** the "Install just for you" checkbox so that the MongoDB shell is install in your program files directory.

The MongoDB Shell is a tool similar to the Windows Command Prompt that allows you to access your database outside the application programming interfaces.

The documentation for the MongoDB Shell can be found here: [https://www.mongodb.com/docs/mongodb-shell/](https://www.mongodb.com/docs/mongodb-shell/)

## Installing MongoDB Tools 

Download and install the MongoDB database tools collection:
[https://www.mongodb.com/try/download/database-tools](https://www.mongodb.com/try/download/database-tools) 

***NOTE:*** this also defaults to a 'zip' download package.  Make sure to select 'msi' to download the installer executable.

These tools provide additional utilities for MongoDB such as backup and restore.  For this exercise you are given a database backup and need to use the tools to restore the database into your MongoDB datastore.

Using the default settings, this should install the programs in the following location:

```text
"C:\Program Files\MongoDB\Tools\100\bin\"
```

The documentation for the Tools collection can be found here: [https://docs.mongodb.com/database-tools/](https://docs.mongodb.com/database-tools/)

## Running the MongoDB Server

To run MongoDB you must first start the server:

1. Start the Windows command prompt.  From the start menu search for and run cmd.exe.

2. Start the ```mongod.exe``` program.  If you chose the default installation location it should be:

   ```text
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
   ```

   Surround your command in double quotes otherwise Windows will give you an error since "Program Files" has a space in it.
   <br><br>
   ***NOTE:*** if you don't want to use the default data store directory, you will have to manually specify the path using ```--dbpath``` (note the 2 dashes).   For example, if your data store path is ```C:\mongo\data``` you would run:

   ```text
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe --dbpath C:\mongo\data"
   ```
   
3. The first time ```mongod.exe``` runs it will do some data store initialization and create several files in your data store path.   If it runs successfully, it should ***NOT*** exit.

   In other words there should ***NOT*** be a command prompt (e.g. C:\) printed.  This indicates that the MongoDB server is running and ready to accept requests

## Running the MongoDB Shell

To interact with MongoDB, you can use the Compass graphical interface or the command line shell.  In this class we'll be using the command line.

To run the MongoDB command line shell:

1. If you chose to install the MongoDB shell for all users (by unchecking "Install just for me"), the executable should be installed in the following location:

   ```text
   C:\Program Files\mongosh
   ```

2. In the folder, there should be a file called ```mongosh.exe```.  Double-click the executable to run the shell.<br/>
   ***NOTE:*** make sure your ```mongod.exe``` program is running in the background

3. Use the default connection to connect to ```mongodb://localhost/```.

4. You should see a welcome message and then see a prompt (i.e. 'test>').  From here you can type commands to interact with your MongoDB server.

5. Make sure you see a message indicating that connection to the server was successful.  If you get an error there is probably something wrong with your MongoDB server. <br>
   ***NOTE:*** Don't worry if you see any server warnings indicating access control or binding to localhost.  All our web applications we'll use for this class will run on localhost and won't need access control set.

6. Typing the 'help' command will print out some helpful information about available commands.  From there you can get more information about each command.

7. When you are done using the MongoDB Shell, type the command 'exit' at the prompt to quit.<br>
   ***NOTE:*** this will not end your MongoDB server program

8. To quit the server program, bring up the server window and press CTRL+C to quit
