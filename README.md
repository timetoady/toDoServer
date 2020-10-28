# toDoServer

## Overview

This to-do app allows you to add and remove categories and to-dos on the fly. You can also alter to-dos by simply selecting it and typing. Removing a category that has to-dos will also remove all to-dos that have that category, so be careful there.

The front end is hosted on static site generated in express, and the back end is divided into to-do routes and category routes. POST objects to the to-do schema take a string of the new to-do, a Boolean on if it's completed, and the given category id, which when received automatically populates that category's information. The category scheme currently only takes the category name, but should take to-dos as soon as this is fixed (although the way the data is interpreted when its pulled by the get and then filtered for showing in the DOM does not depend on this anyway.)

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