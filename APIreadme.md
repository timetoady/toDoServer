# Todo App API 

### URL
https://blooming-castle-98003.herokuapp.com/

## Methods / Endpoints

`GET` '/':

Serves static page front end of todo app.

`GET` '/todos':

Returns all to-dos with category info populated.

`GET` '/categories':

Returns all stored manufacturers

`GET` '/todos/:todo'

Returns one todo entry by full, complete todo name.

`GET` '/todos/byCategory/:catID'

Returns all to-do entry by category ID as a request parameter.

`POST` '/todos":

Given to-do, completion state, and category as req body/JSON, adds todo to DB.

`POST` '/categories":

Given category as request body/JSON, adds new category.

`PUT` '/todos/:id/:key/:value":

Given to-do ID, key, and value as params, lets you edit or add any key value pair in to-dos.

`PUT` '/categories/:id/:key/:value":

Given category ID, key, and value as params, lets you edit or add any key value pair in categories.

`DELETE` '/todos/:id':

Given to-do ID as parameter, removes to-do from db. Will confirm removed object ID or return an error if matching ID is not found.

`DELETE` '/todos/purge/all':

When called, deletes all to-dos in database.

`DELETE` '/deleteAll/:category':

Given category ID as parameter, removes all to-dos in that category from db. 

`DELETE` '/categories/:id':

Given category ID as parameter, removes category from db. Will confirm removed object ID or return an error if matching ID is not found.

`DELETE` '/categories/purge/all':

When called, deletes all categories in database.