//Remaining issues to solve

//Features to update
//Get cateogry info in modal instead of a prompt

const allCategories = "./categories";
const allTodos = "./todos";

//API Methods

//General method method
async function getAPIData(URL, method, modifier = " ") {
  try {
    const response = await fetch(URL + `${modifier}`, {
      method: method,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

//Get by ID method
async function getAPIByIDData(URL, modifier = " ") {
  try {
    const response = await fetch(URL + `/${modifier}`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

//POST method
async function sendAPIData(URL, upload = {}) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        //Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(upload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//DELETE method
async function deleteAPIData(URL, ID) {
  try {
    const response = await fetch(URL + `/${ID}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//PUT method
async function updateAPIData(URL, id, key, value) {
  try {
    const response = await fetch(URL + `/${id}/${key}/${value}`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const getTodos = () => {
  getAPIData(allTodos, "GET").then(() => refreshDOM())
};

//getsAPI data, which triggers DOMbuilder based on filtered todos
getAPIData(allTodos, "GET").then((todos) => {
  DOMbuilder(filterToDOM(todos));
});

//General get categories
const getCats = () => {
  getAPIData(allCategories, "GET").then(() => refreshDOM())
};

//Post handler for todos
const sendTodos = (object) => {
  sendAPIData(allTodos, object).then(() => refreshDOM())
};

//POST handler for categories
const sendCat = (object) => {
  sendAPIData(allCategories, object).then(() => refreshDOM())
  .then(() => document.querySelector(`#input${object._id}`).focus())
};

const markDone = (url, id, key, value) => {
  updateAPIData(url, id, key, value).then(() => refreshDOM())

}

//Main function that gets categories from localStorage and populates them in DOM with attributes.
let catDiv = document.querySelector("#catDiv");
let catGetter = () => {
  containerExists = document.querySelector("#category");
  if (containerExists === null) {
    categoryDrop = document.createElement("select");
    categoryDrop.setAttribute("id", "category");
    catDiv.appendChild(categoryDrop);
  } else {
    containerExists.remove();
    console.log("Removed old container");
    categoryDrop = document.createElement("select");
    categoryDrop.setAttribute("id", "category");
  }
  getAPIData(allCategories, "GET").then((catsIn) => {
    catDiv.appendChild(categoryDrop);
    let categories = catsIn.map((object) => [object.category, object._id]);
    console.log(categories);
    let noDuplicates = [...new Set(categories)];
    noDuplicates.forEach((category) => {
      let catOption = document.createElement("option");
      catOption.value = category[0];
      catOption.textContent = category[0];
      console.log(`catGetter says this category ID is:`);
      console.log(category[1]);
      catOption.id = category[1];
      categoryDrop.appendChild(catOption);
    });
    //Here, after the categories populated from the DB, automaticaly adds a blank &
    //a new category adding option.
    let newCatAdd = document.createElement("option");
    newCatAdd.setAttribute("id", "newCat");
    newCatAdd.value = "new";
    newCatAdd.textContent = "Add new category...";
    categoryDrop.appendChild(newCatAdd);
    categoryDrop.addEventListener("change", () => {
      if (categoryDrop.value === "new") {
        newCat = prompt("Add a new category");
        badCatCheck = badCatInput(newCat);
        if (badCatCheck === false) {
          categoryConstruct(newCat);
          //catGetter();
          //refreshDOM();
        }
      }
    });
  });
};

//function for various invalid category entries
let badCatInput = (input) => {
  if (dupCheckCat(input) === true) {
    alert("Category already added.");
    catGetter();
    return true;
  } else {
    switch (input) {
      case null:
      case undefined:
        alert("Null and undefined values not valid");
        catGetter();
        return true;
      case "":
      case " ":
      case "  ":
      case "   ":
      case "    ":
      case "     ":
      case "      ":
      case "       ":
      case "        ":
      case "         ":
        alert("Blank category already added.");
        catGetter();
        return true;
      case "fuck":
      case "shit":
        alert("Invalid category name. Please try again.");
        catGetter();
        return true;
      default:
        return false;
    }
  }
};

//Small function that refreshes the DOM rendering as needed. Will do replaceWith() next time.
let refreshDOM = () => {
  let oldDiv = document.querySelector("#listContainer");
  oldDiv.remove();
  getAPIData(allTodos, "GET").then((todos) => {
    DOMbuilder(filterToDOM(todos));
  });
};

//Commits recieved todo object to DB.
let addTodoToDB = (obj) => {
  sendTodos(obj);
  //localStorage.setItem(obj.id, JSON.stringify(obj));
};

//Commits recieved category object to DB.
let addCatToDB = (obj) => {
  sendCat(obj);
  //localStorage.setItem(obj.id, JSON.stringify(obj));
};

//Set initial todos to storage manually via button
// let catReset = document.querySelector("#reset");
// catReset.addEventListener("click", () => {
//   localStorage.clear();
//   resetCats();
// });

// let resetCats = () => {
//   initialCats = getCats()
//   initialCats.forEach((obj) => {
//     sendCat(obj);
//     location.reload();
//   });
// };

//Add initialTodos if none on load just once
// const checkStorage = () => {
//   storage = getTodos();
//   storage.length === 0 ? resetCats() : null;
// };

// window.addEventListener(
//   "load",
//   () => {
//     checkStorage();
//   },
//   { once: true }
// );

//Function to get info from storage for display
// let getInfoById = (id) => {
//   let theItem = JSON.parse(localStorage.getItem(id));
//   return theItem;
// };

const getInfoById = (ID) => {
  getAPIByIDData(allTodos, ID).then((object) => {
    return object;
  });
};

//flick
//Checks contents of current local storage, putes them in array of objects, filtering out nulls
let getAllStorageInfo = () => {
  infoArray = [];
  getAPIData(allTodos, "GET").then((todos) => {
    for (key in todos) {
      // console.log(key)
      infoArray.push(getInfoById(key));
    }
  });
  return infoArray;
};

window.addEventListener(
  "load",
  () => {
    catGetter();
  },
  { once: true }
);

//Gets the ID of an object in local storage by it's todo value
let getIDByTodo = (getTodo) => {
  getAPIData(allTodos, "GET").then((todos) => {
    todos.forEach((obj) => {
      if (obj.todo === getTodo) {
        console.log(obj.id);
        return obj.id;
      }
    });
  });
};

//Gets the category of an object in local storage by it's id
let getCatByID = (ID) => {
  getAPIData(allCategories, "GET").then((categories) => {
    categories.forEach((obj) => {
      if (obj.id === ID) {
        console.log(obj.category);
        return obj.category;
      }
    });
  });
};

//Function called up to consturct object with category and todo value, giving a random ID
//by default unless ID is specified
let autoConstruct = (inheretCat, newVal) => {
  console.log(`Category to construct for: ${inheretCat}`);
  newTodoObj = {};
  newTodoObj["todo"] = newVal;
  newTodoObj["completed"] = false;
  newTodoObj["category"] = inheretCat;
  console.log("Here is the new object");
  console.log(newTodoObj);
  sendTodos(newTodoObj);
  //return newTodoObj._id;
};

const categoryConstruct = (newCategory) => {
  console.log(`New category is ${newCategory}`)
  newCategoryObj = {}
  newCategoryObj["category"] = newCategory
  sendCat(newCategoryObj)
}

//Functions to remove and update localStorage
let removeTodoById = (id) => {
  deleteAPIData(allTodos, id).then(() => refreshDOM());
};

//Function to change info requires the ID, the key to be changed, and the value that will be changed
// let changeInfoByID = (id, infoKey, value) => {
//   updateAPIData(id, infoKey, value);
// };

//Get info from needed parts by selecting hardcoded parts of DOM
const showHide = document.querySelector("#showHide");
showHide.textContent = "HIDE COMPLETE";
const addButton = document.querySelector("#addButton");
const newToDo = document.querySelector("#newToDo");
const theOutput = document.querySelector("#output");

//Listener for hide complete
showHide.addEventListener("click", () => {
  showStateSet();
});

//Gets the value of the category drop down
let getCategoryValue = () => {
  console.log(`Get cat value running.`)
  categoryDrop.addEventListener("change", () => {
    console.log(`Here is the name of the category:`)
    console.log(categoryDrop.value);
    console.log(`And the cat id is ${categoryDrop.options[categoryDrop.selectedIndex].id}`);
  });
  return categoryDrop.options[categoryDrop.selectedIndex].id;
};

//Primary filter to make localStorage more parsable to put into the DOM. Passes to DOMbuilder.
let filterToDOM = (data) => {
  console.log(data);

  categoryByObj = {};
  data.forEach((object) => {
    console.log(object.category.category);
    catDisplay = object.category.category;
    todoForList = object.todo;
    isComplete = object.completed;
    todoID = object._id;
    if (catDisplay in categoryByObj) {
      categoryByObj[catDisplay]["todo"][todoForList] = {};
      categoryByObj[catDisplay]["todo"][todoForList]["completed"] = isComplete;
      categoryByObj[catDisplay]["todo"][todoForList]["id"] = todoID;
    } else {
      categoryByObj[catDisplay] = {};
      categoryByObj[catDisplay]["todo"] = {};
      categoryByObj[catDisplay]["todo"][todoForList] = {};
      categoryByObj[catDisplay]["todo"][todoForList]["completed"] = isComplete;
      categoryByObj[catDisplay]["todo"][todoForList]["id"] = todoID;
    }
  });
  return categoryByObj;
};

//A function to drill into and get info created by the nested filter above
function getNested(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

//Function that governs switch of Show/Hide button
const showStateSet = () => {
  if (showHide.value === "hide") {
    showHide.value = "show";
    showHide.textContent = "HIDE COMPLETE";
    refreshDOM();
  } else {
    showHide.value = "hide";
    showHide.textContent = "SHOW ALL";
    refreshDOM();
  }
};

//Series of event listeners for the add todo box functionality
let thatsADup = new Audio("src/incorrect.wav");

const governAddTodo = () => {
  isDups = dupCheck(newToDo.value);
  console.log(`isDups says ${isDups}`);
  if (isDups === true) {
    console.log(`isDups = ${isDups}`);
    newToDo.placeholder = "Duplicate todo provided";
    thatsADup.play();
    newToDo.classList.remove("rejectDupMessage");
    void newToDo.offsetWidth;
    newToDo.classList.add("rejectDupMessage");
    newToDo.value = null;
  } else {
    newToDo.placeholder = "Enter new todo...";
    newToDo.classList.remove("rejectDupMessage");
    autoConstruct(getCategoryValue(), newToDo.value);
    //refreshDOM();
    newToDo.value = null;
    newToDo.focus();
  }
};

newToDo.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    governAddTodo();
  }
});

newToDo.addEventListener("click", () => {
  newToDo.placeholder = " ";
});

newToDo.addEventListener("blur", () => {
  newToDo.placeholder = "Enter todo here...";
  newToDo.classList.remove("rejectDupMessage");
});

addButton.addEventListener("click", () => {
  governAddTodo();
});

//checks for duplicates for added todos
let dupCheck = (value) => {
  selectedCategory = getCategoryValue();
  console.log("dupCheck running");
  console.log(`Incoming category is ${value}`);
  getAPIData(allTodos, "GET").then((todos) => {
    console.log(todos);
    check = false;
    todos.forEach((object) => {
      console.log(object.category.category);
      console.log(object.todo);
      if (object.todo === value && object._id === selectedCategory) {
        console.log("NOOOOOOOOPE!");
        check = true;
      }
      return check;
    });
    
  });
};

//Checks for duplicates for adding categories
let dupCheckCat = (category) => {
  //selectedCategory = getCategoryValue();
  getAPIData(allCategories, "GET").then((categories) => {
    check = false;
    categories.forEach((object) => {
      if (object.category === category) {
        console.log("Duplicate category add detected!");
        check = true;
      }
    });
    return check;
  });
};

//The main function that shows filtered info on the DOM
let DOMbuilder = (filteredData) => {
  console.log("DOMbuilder start!");
  console.log("Heres the filtered data");
  console.log(filteredData);
  containerExists = document.querySelector("#listContainer");
  if (containerExists === null) {
    containDiv = document.createElement("div");
    containDiv.setAttribute("id", "listContainer");
  } else {
    containerExists.remove();
    console.log("Removed old container");
    containDiv = document.createElement("div");
    containDiv.setAttribute("id", "listContainer");
  }
  theOutput.appendChild(containDiv);
  for (category in filteredData) {
    categoryUL = document.createElement("ul");
    categoryUL.textContent = category;
    containDiv.appendChild(categoryUL);
    containedTodos = getNested(() => filteredData[category]["todo"]);
    for (todo in containedTodos) {
      todoStates = getNested(() => filteredData[category]["todo"][todo]);
      todoDiv = document.createElement("div");
      todoDiv.setAttribute("id", `div${todoStates.id}`);
      categoryUL.appendChild(todoDiv);
      let todoInput = document.createElement("input");

      //Here I call the resizable to make sure my listed todo inputs are always the right size
      resizable(todoInput, 10);
      todoInput.value = todo;
      todoInput.placeholder = "List item";
      todoInput.name = todoStates.category;
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `${todoStates.id}`;
      todoInput.addEventListener("input", () => {
        updateAPIData(allTodos, checkbox.id, "todo", todoInput.value);
      });

      //Experimental auto add new entry box
      // todoInput.addEventListener(
      //   "keyup",
      //   () => {
      //     let newDiv = document.createElement("div");
      //     let newInput = document.createElement("input");
      //     let newCheck = document.createElement("input");
      //     newCheck.type = "checkbox";
      //     newCheck.id = ;
      //     let newX = document.createElement("button");
      //     newX.textContent = "✕";
      //     //flabby
      //     newX.addEventListener("click", () => {
      //       removeTodoById(newCheck.id);
      //       refreshDOM();
      //     });
      //     newInput.setAttribute("id", newCheck.id);
      //     newInput.setAttribute("class", `nostrike`);
      //     newInput.addEventListener("blur", () => {
      //     autoConstruct("", newInput.value, `input${newCheck.id}`);
      //      });
      //     categoryUL.appendChild(newDiv);
      //     newDiv.appendChild(newCheck);
      //     newDiv.appendChild(newInput);
      //     newDiv.appendChild(newX);
      //   },
      //   { once: true }
      // );

      todoInput.setAttribute("id", `input${checkbox.id}`);
      categoryUL.setAttribute("id", `ul${checkbox.id}`);
      checkbox.value == `${todoStates.id}`;

      //Hides completed items
      if (todoStates.completed === true) {
        todoInput.setAttribute("class", "striked");
        checkbox.checked = true;
        showHide.value === "hide"
          ? todoDiv.setAttribute("class", "hidden")
          : todoDiv.setAttribute("class", "show");
      } else {
        todoInput.setAttribute("class", "nostrike");
        checkbox.checked = false;
      }
      let removeIt = document.createElement("button");
      removeIt.textContent = "✕";
      removeIt.addEventListener("click", () => {
        removeTodoById(checkbox.id);
        //refreshDOM();
        //catGetter();
      });
      todoDiv.appendChild(checkbox);
      todoDiv.appendChild(todoInput);
      todoDiv.appendChild(removeIt);

      //Strikes completed items by checkbox ID
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          console.log(`Checkbox ${checkbox.id} is checked`);
          //updateAPIData(allTodos, checkbox.id, "completed", true);
          markDone(allTodos, checkbox.id, "completed", true)
        } else if (checkbox.checked === false) {
          console.log(`Checkbox ${checkbox.id} is unchecked`);
         // updateAPIData(allTodos, checkbox.id, "completed", false);
         markDone(allTodos, checkbox.id, "completed", false)
          
        }
      });
    }
  }
  console.log("DOMbuilder completed.");
};

//Function I borrowed to automatically resize inputs when content is too large
function resizable(el, factor) {
  var int = Number(factor) || 7.7;
  function resize() {
    el.style.width = (el.value.length + 1) * int + "px";
  }
  var e = "keyup,keypress,focus,blur,change".split(",");
  for (var i in e) el.addEventListener(e[i], resize, false);
  resize();
}

//Extra fun
const keySequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

let userInput = new Array(keySequence.length);
let contra = new Audio("src/contra.mp3");

window.addEventListener("keydown", ({ key }) => {
  userInput = [...userInput.slice(1), key];

  if (keySequence.every((v, k) => v === userInput[k])) {
    contra.play();
    autoConstruct("Lives", 30);
    refreshDOM();
    catGetter();
  }
});
