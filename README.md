# toDoServer

## Overview

This to-do app allows you to add and remove categories and to-dos on the fly. You can also alter to-dos by simply selecting it and typing. Removing a category that has to-dos will also remove all to-dos that have that category, so be careful there.

The app has a few hard-coded objects at the top, but is primarily dynamically rendered JavaScript that filters the database info and renders it to the DOM with needed alterations for appearance and interaction elements.

Structurally, the front end had to be refactored to account for the asynchronous API calls sending data back and forth. The app is also very "talky"--it sends a lot of specific information to the console to let you know exactly when duplicates are being checked and against what, what objects are being given an received, and when the DOM is being rendered, and more.

## To Run Locally

You'll need to install [Node.js](https://nodejs.org/en/), and npm the following dependencies:

* express
* body-parser
* dotenv*
* mongoose

Also useful: nodemon to run local server that recompiles after any changes made.

*Make sure you add you own .env file with your database password link, obtainable from your mongoDB Atlas by clicking "CONNECT" > "Connect Your Application" and copying the supplied string with alterations as the dialog instructs.

You'll also need to obtain a mongoDB Atlas cluster or similar to host your data, and whitelist the needed IP addresses. If you want to host the code, heroku.com can work. 

Here's a handy guide on getting heroku and MongoDB/atlas [talking to each other](https://dev.to/cpclark360/how-to-host-a-restful-node-js-server-with-mongodb-atlas-database-on-heroku-1opl). 

## API Information 
[HERE](https://github.com/timetoady/toDoServer/blob/main/APIreadme.md)


## Special secret

...to those who know the Konami Code.