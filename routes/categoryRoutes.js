const express = require("express");
const router = express.Router();
const Categories = require("../schema/categories");
const Todo = require("../schema/todos");

const checkError = (err, res) => {
  err && res.send(`Looks like we've got an Error: ${err}`);
};

//Create Category entry
router.post("/categories", (req, res) => {
  Categories.create(
    {
      category: req.query.category,
      todos: req.query.todoId,
    },
    (err, category) => {
      err
        ? res.send(`Looks like we've got an Error: ${err}`)
        : Todo.findById(req.query.todoId, (err, todos) => {
            if (err)
              res.send(
                `The todo ID adder for ${todos} categories says error is: ${err}`
              );
            todos.categories.push(category._id);
            todos.update(todo, (err, todo) => {
              if (err)
                res.send(`Error in cat create todo ${todo} update is: ${err}`);
            });
          });
    }
  );
  Categories.find((err, categories) => {
    checkError(err, res);
    res.json(categories);
  });
});

//Get all current manufacterers
router.get("/categories", (req, res) => {
  Categories.find((err, categories) => {
    checkError(err, res)
    })
    .populate("todos")
    .exec(function (err, category) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(category);
    });
  });


//delete a category by id
router.delete("/categories/:id", (req, res) => {
  Categories.deleteOne({ _id: req.params.id }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Category ID ${req.params.id} removed.`);
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
