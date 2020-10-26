const express = require("express");
const router = express.Router();
const Categories = require("../schema/categories");
const Todo = require("../schema/todos");

const checkError = (err, res) => {
  err && res.send(`Looks like we've got an Error: ${err}`);
};

//Create Category entry
router.post("/", (req, res) => {
  Categories.create(
    {
      category: req.body.category,
      todos: req.body.todoId,
    },
    (err, category) => {
      err
        ? res.send(`Looks like we've got an Error: ${err}`)
        : 
        // Todo.findById(req.body.todoId, (err, todos) => {
        //     if (err)
        //       res.send(
        //         `The todo ID adder for ${todos} categories says error is: ${err}`
        //       );
        //     todos.categories.push(category._id);
        //     todos.update(todo, (err, todo) => {
        //       if (err)
        //         res.send(`Error in cat create todo ${todo} update is: ${err}`);
        //     });
        //   });
          Categories.find((err, categories) => {
            checkError(err, res);
            res.json(categories);
          });
    }
  );

});

//Get all current manufacterers
router.get("/", (req, res) => {
  Categories.find((err, categories) => {
    checkError(err, res);
  })
    .populate("todos")
    .exec(function (err, category) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(category);
    });
});

//delete a category by id
router.delete("/:id", (req, res) => {
  Categories.deleteOne({ _id: req.params.id }, (err) => {
    err
      ? res.send(`Error here! ${err}`)
      : res.send(`Category ID ${req.params.id} removed.`);
  });
});

router.delete("/purge/all", (req, res) => {
  Categories.deleteMany({ "__v": 0 }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Deleted ${res.deletedCount} categories.`);
  })
  .then(Categories.create({category: " "}), (err)  => {
    err
      ? res.send(`Error here! ${err}`)
      : res.send(`Added single blank category.`);
  })
});

//Find and change document key's value by id via direct params
router.put("/:id/:key/:value", (req, res) => {
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
