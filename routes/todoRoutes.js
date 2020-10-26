const express = require("express");
const router = express.Router();
const Todo = require("../schema/todos");

const checkError = (err, res) => {
    err && res.send(`Looks like we've got an Error: ${err}`);
  };


//Create todo entry
router.post("/", (req, res) => {
  Todo.create(
    {
      todo: req.body.todo,
      completed: req.body.completed,
      category: req.body.category,
    },
    (err) => {
      err
        ? res.send(`Sorry, looks like we've got an Error: ${err}`)
        : Todo.find((err, category) => {
            checkError(err, res);
          })
            .populate("category")
            .exec(function (err, todo) {
              err
                ? res.send(`Oops! There was an error: ${err}`)
                : res.json(todo);
            });
    }
  );
});

//Get all current todos
router.get("/", (req, res) => {
  Todo.find((err, todos) => {
    checkError(err, res);
  })
    .populate("category")
    .exec(function (err, todo) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(todo);
    });
});

//find a specific todo by name
router.get("/:todo", (req, res) => {
  const { todo } = req.params;
  Todo.findOne({ todo: `${todo}` }, (err, todo) => {
    if (err) res.send(`Error was: ${err}`);
    if (null) res.send(`${todo} not found`);
    res.json(todo);
  });
});

//Delete a todo by id
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Todo ID ${req.params.id} removed`);
  });
});

//Delete all todos
router.delete("/purge/all", (req, res) => {
  Todo.deleteMany({ "__v": 0 }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Deleted ${res.deletedCount} todos.`);
  })
});

//Find and change document key's value by id via direct params
router.put("/:id/:key/:value", (req, res) => {
  const { id, key, value } = req.params;
  data = { [key]: value };
  Todo.findByIdAndUpdate(id, data, { new: true }, function (
    err,
    todo
  ) {
    err ? res.send(`Put method says: Error! ${err}`) : res.json(todo);
  });
});

//Find all todos by category ID
router.get("/byCategory/:catID", (req, res) => {
  const { catID } = req.params;
  console.log(catID);
  Todo.find({ category: { $all: [catID] } }, (err) => {
    checkError(err, res);
  })
    .populate("category")
    .exec(function (err, todo) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(todo);
    });
});

module.exports = router;
