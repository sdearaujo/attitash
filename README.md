# CMPSCI 326 Web Programming: Team Attitash 
 
## How to Run
You can run our app using `node app.js`
 
## Project Assignment 04

Here is a list of the files and the additions we made:

- sql/init.txt: Creates initial database tables
- lib/tash.js: Accesses the database and provides functions for tashs
- lib/trend.js: Accesses the database and provides functions for trends
- lib/user.js: Accesses the database and provides functions for users
- public/javascripts/attitash.js: Contains the ajax function which updates the news feed on the home page
- routes/index.js: Contains the create.tash function which provides the data returned to ajax 
- socket/index.js: Sends Web Socket data to clients 
- app.js: Initiates web sockets and clients
- data/tashs.db.js: represent our tash table in the database
- data/trend.db.js: represent our trend table in the database
- data/user.db.js: represent our user table in the database

Functionality Who's Online?
- The user can see a list of that are online at the moment
Functionality real time chat client
- The user can have a real time chat with other users who are both followers and followed by that particular user.

======================================
