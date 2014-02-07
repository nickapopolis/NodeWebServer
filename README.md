NodeWebServer
=============

A node.js web server that allows a user to submit account info to a database, which is hosted on server-side.

Client Side
=============
-The user's input is parsed using JQuery on client side to check whether the info they have entered is valid. 
-When an email is entered, it is sent to the server to check whether it has already been saved to the database.
-When a password is entered a second time, it is compared against the first entry to see whether they match.
-Pressing the submit button will send the login info via POST to the server, where it is saved.

Server Side
=============
-The web server automatically routes the user to the start page when they go to the default url.
-If the user navigates to a url where an event handler exists on server side, they will be directed to a webpage.


