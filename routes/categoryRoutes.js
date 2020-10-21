const express = require("express");
const router = express.Router();
const Categories = require("../schema/categories");
const todos = require("../schema/todos");
const Todo = require('../schema/todos')

const checkError = (err, res) => {
  err && res.send(`Looks like we've got an Error: ${err}`);
};

//Create Category entry
router.post("/categories", (req, res) => {
  Categories.create(
    {
      category: req.query.name,
      todos: req.query.todoId,
    },
    (err, category) => {
      err
        ? res.send(`Looks like we've got an Error: ${err}`)
        : Todo.findById(req.query.todoID, (err, todo) => {
            if(err) 
            res.send(`The todo ID adder for ${todo} categories says error is: ${err}`)
        }) 
            todo.categories.push(category._id)
            todo.update(todo, (err, todo) => {
                if (err)
                res.send(`Error in Cat Create todo update is: ${err}`)
            })
        })
        Categories.find((err, categories) => {
            checkError(err, res);
            res.json(categories);
          });
    });

//Get all current manufacterers
router.get("/categories", (req, res) => {
  Categories.find((err, categories) => {
    checkError(err, res);
    res.json(categories);
  });
});

//delete a category by id
router.delete("/categories/:id", (req, res) => {
  catName = Categories.findById(req.params.id).exec();
  Categories.remove({ _id: req.params.id }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Category ${catName} ID ${req.params.id} removed.`);
  });
});

//Find and change document key's value by id via direct params
router.put("/categories/:id/:key/:value", (req, res) => {
  const { id, key, value } = req.params;
  data = { [key]: value };
  Categories.findByIdAndUpdate(id, data, { new: true }, function (
    err,
    category
  ) {
    err ? res.send(`Survey says: Error! ${err}`) : res.json(category);
  });
});

module.exports = router;
