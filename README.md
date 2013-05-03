# CMPSCI 326 Web Programming: Team Attitash 
 
## How to Run
You can run our app using `node app.js`
 
## Project Assignment 05

### User Accounts
-Use any of these accounts to log in and interact with attitash
-u: BrianD p: brian
-u: AnthonyB p: anthony
-u: JohnC p: john
-u: SamN p: samuel
-u: realDonaldTrump p: donald
-u: TechCrunch p: techcrunch
-u: nodejs p: nodejs
-u: BarackObama p: barack
(if one doesn't work most likely due to testing change password feature ;)

-feel free to create your own account

Here is a list of the files and the additions we made:

- sql/init.sql: Creates initial database tables and insert some base data
- lib/users.js: Accesses the database and provides functions for users
- lib/tashs.js: Accesses the database and provides functions for tashs
- lib/following.js: Accesses the database and provides functions for trends
- public/javascripts/attitash.js: Contains the ajax function which updates the news feed when sending a tweet on the home page
- routes/index.js: Contains the create tash function which provides the data returned to ajax 
- socket/index.js: Sends Web Socket data to clients 
- app.js: Initiates web sockets and clients
- data/attitash.db: Our sqlite3 db file where app data is stored

Functionality: Who's Online?
- The user can see a list of users that are online at the moment
Functionality: real time chat client
- The user can have a real time chat with other users who are both followers and followed by that particular user.

======================================
