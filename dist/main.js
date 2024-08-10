/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (806:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n|   }\n| }\n> ");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   createNewProject: () => (/* binding */ createNewProject)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");



class Project {

  constructor(title, todoItemList, index) {

    this.title = title;
    this.todoItemList = todoItemList;
    this.index = index;
    this.hashSet = {};

    for(let i = 0; i < this.todoItemList.length; i++) {

      this.hashSet[`${this.todoItemList[i].getIndex()}`] =
        this.todoItemList[i];
    }
  }


  resetHashSet() {
    
    for(let i = 0; i < this.todoItemList.length; i++) {

      this.hashSet[`${this.todoItemList[i].getIndex()}`] =
        this.todoItemList[i];

    }
  }
  


  addToItems(todoItem) {

    this.todoItemList.push(todoItem);
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.addToStorage)(this);
    this.resetHashSet();

  }


  removeItemByTitle(todoTitle) {

    let newArray = [];

    for(let i = 0; i < this.todoItemList.length; i++) {

      if(todoTitle == this.todoItemList[i].getTitle()) continue;

      newArray.push(this.todoItemList[i]);

    }

    this.todoItemList = newArray;
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.addToStorage)(this);

    
  }


  removeItemByIndex(todoIndex) {

    let newArray = [];

    for(let i = 0; i < this.todoItemList.length; i++) {

      if(todoIndex == this.todoItemList[i].getIndex()) continue;

      newArray.push(this.todoItemList[i]);

    }

    this.todoItemList = newArray;
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.addToStorage)(this);

    
  }
  

  getTodos() {

    return this.todoItemList;
    
  }

  
  getTitle() {
    return this.title;
  }


  getLength() {

    return this.todoItemList.length;

  }


  getIndex() {
    return this.index;
  }


  setIndex(index) {
    this.index = index;
  }


  indexExists(index) {

    if (index in this.hashSet) {

      return true;
      
    } else {
      
      return false;
      
    }
  }

  
  
  getTodoByIndex(index) {

    let todoItem = {};

    for(let i = 0; i < this.todoItemList.length; i++) {

      if(index == this.todoItemList[i].getIndex()) {

        todoItem = this.todoItemList[i];

      } 
    }

    return todoItem;

  }


  getTodoByTitle(title) {

    let todoItem = {};

    for(let i = 0; i < this.todoItemList.length; i++) {

      if(title == this.todoItemList[i].getTitle()) {

        todoItem = this.todoItemList[i];

      } 
    }
    return todoItem;

  }
}


function createNewProject (projTitle, i) {

  if (projTitle == "") {

    return;

  }

  const newProject = new Project(projTitle, [], i);
  (0,_storage__WEBPACK_IMPORTED_MODULE_0__.addToStorage)(newProject);

  
  return newProject;

}



/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToStorage: () => (/* binding */ addToStorage),
/* harmony export */   getAllProjectsFromStorage: () => (/* binding */ getAllProjectsFromStorage),
/* harmony export */   getContentFromStorage: () => (/* binding */ getContentFromStorage),
/* harmony export */   getIndexFromStorage: () => (/* binding */ getIndexFromStorage),
/* harmony export */   getProjectFromStorage: () => (/* binding */ getProjectFromStorage),
/* harmony export */   getTitleFromStorage: () => (/* binding */ getTitleFromStorage)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");




function addToStorage(project) {

  const storageKey = project.getTitle();
  const storageValue = 
    JSON.stringify({content: JSON.stringify(project.getTodos()), index: project.getIndex()});

  localStorage.setItem(storageKey, storageValue);

}

function getProjectFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  const items = JSON.parse(storageContent.content);

  
  const todoItems = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.unwrapAndMakeTodo)(items);

  const project = new _projects__WEBPACK_IMPORTED_MODULE_1__.Project(key, todoItems, JSON.parse(storageContent.index));
  return project;
  
}

function getTitleFromStorage(project) {

  const projObject = JSON.parse(localStorage.getItem(project.getTitle()));

  console.log("fix this?");
  return projObject.title;

}

function getContentFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  const items = JSON.parse(storageContent.content);
  
  const todoItems = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.unwrapAndMakeTodo)(items);

  return todoItems;
  
}

function getIndexFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  return storageContent.index;
  
}


function getAllProjectsFromStorage () {
  
  let returnArray = [];

  for (let i = 0; i < localStorage.length; i++) {

    for(let [key, value] of Object.entries(localStorage))  {

      const item = (JSON.parse(value));

      if(item.index == i) {

        const project = getProjectFromStorage(key);
        returnArray.push(project);

        break;
      }
    }
  }

    return returnArray;
  
}




/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Todo: () => (/* binding */ Todo),
/* harmony export */   unwrapAndMakeTodo: () => (/* binding */ unwrapAndMakeTodo)
/* harmony export */ });
class Todo {

  constructor(title, description, duedate, priority, complete, todoIndex) {

    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.complete = complete;
    this.todoIndex = todoIndex

  }


  setDate(newDate) {

    this.duedate = newDate;
    
  }


  get() {

    const todoPackage = {title: this.title, description: this.description, duedate: this.duedate, priority: this.priority, complete: this.complete, todoIndex: this.todoIndex};
    
    return todoPackage;
    
  }


  getIndex() {

    return this.todoIndex;

  }


  getTitle() {
    
    return this.title;

  }


  getColor() {

    return this.priority;
    
  }


  getDate() {
    
    return this.duedate;

  }


  getDesc() {
    return this.description;
  }


  setDesc(newDesc) {

    this.description = newDesc;
    
  }
  
  

}

// Takes an array of objects and returns array of todo items.
function unwrapAndMakeTodo (todoItemList) {
  
  let array = [];

  for (let i = 0; i < todoItemList.length; i++) {

    let item = new Todo(todoItemList[i].title, 
                        todoItemList[i].description, 
                        todoItemList[i].duedate,
                        todoItemList[i].priority,      
                        todoItemList[i].complete,
                        todoItemList[i].todoIndex); 
    array.push(item)

  }

  return array;

}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");





const fill = function fillDefault() {

  const date = new Date();
  const defaultTodo = new _todo__WEBPACK_IMPORTED_MODULE_0__.Todo("Example Todo Item", "Example Description", date, "Tomato", "false", "0");
  const defaultTodo2 =new _todo__WEBPACK_IMPORTED_MODULE_0__.Todo("Example 2 Todo Item", "Example Description", date, "Tomato", "false", "1");
  const defaultTodo3 =new _todo__WEBPACK_IMPORTED_MODULE_0__.Todo("Example 3 Todo Item", "Example Description", date, "Tomato", "false", "1");
  const defaultProj = new _projects__WEBPACK_IMPORTED_MODULE_1__.Project("Default Project",[defaultTodo, defaultTodo2], 0);
  const defaultProj2 = new _projects__WEBPACK_IMPORTED_MODULE_1__.Project("Default Project2",[defaultTodo, defaultTodo3], 1);

  (0,_storage__WEBPACK_IMPORTED_MODULE_2__.addToStorage)(defaultProj);
  (0,_storage__WEBPACK_IMPORTED_MODULE_2__.addToStorage)(defaultProj2);
  
}


document.body.style = "display: grid; padding: 0; margin: 0; grid-template: 100vh/ 1fr 3fr; font-size: 28px; background-color: whitesmoke; font-family: Verdana, sans-serif; display: flex; align-content: center; justify-content: center;"

const projContainer = document.createElement("div");
projContainer.id = "proj-container";
projContainer.style = "padding-left: 35px; display: flex; flex-direction: column;";

const todoContainer = document.createElement("div");
todoContainer.id = "todo-container";
todoContainer.style = "padding-left: 35px;";

document.body.appendChild(projContainer);
document.body.appendChild(todoContainer);


const projDiv = document.createElement("div");
projDiv.id = "proj-div";


const todoDiv = document.createElement("div");
todoDiv.id = "todo-div";

projContainer.appendChild(projDiv);
todoContainer.appendChild(todoDiv);

(0,_dom__WEBPACK_IMPORTED_MODULE_3__.addTodoButton)();
(0,_dom__WEBPACK_IMPORTED_MODULE_3__.addProjButton)();

const projHeader = document.createElement("h2");
projHeader.textContent = "Projects"
projHeader.style = "font-size: 1.7rem;";
projDiv.appendChild(projHeader);

// Add default.
if (localStorage.length == 1 && localStorage.getItem("debug") != null) {

  fill();
  
}

(0,_dom__WEBPACK_IMPORTED_MODULE_3__.populateProjects)((0,_storage__WEBPACK_IMPORTED_MODULE_2__.getAllProjectsFromStorage)());

(0,_dom__WEBPACK_IMPORTED_MODULE_3__.setTodoList)();

(0,_dom__WEBPACK_IMPORTED_MODULE_3__.addEvents)();





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONEI7QUFDTztBQUloQjtBQU9KOztBQUVmOztBQUVBO0FBQ0EsMEJBQTBCLHVDQUFJO0FBQzlCLDBCQUEwQix1Q0FBSTtBQUM5QiwwQkFBMEIsdUNBQUk7QUFDOUIsMEJBQTBCLDhDQUFPO0FBQ2pDLDJCQUEyQiw4Q0FBTzs7QUFFbEMsRUFBRSxzREFBWTtBQUNkLEVBQUUsc0RBQVk7QUFDZDtBQUNBOzs7QUFHQSxzQ0FBc0MsWUFBWSxXQUFXLCtCQUErQixpQkFBaUIsOEJBQThCLGtDQUFrQyxlQUFlLHVCQUF1Qix3QkFBd0I7O0FBRTNPO0FBQ0E7QUFDQSwyQ0FBMkMsZUFBZSx1QkFBdUI7O0FBRWpGO0FBQ0E7QUFDQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtREFBYTtBQUNiLG1EQUFhOztBQUViO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQWdCLENBQUMsbUVBQXlCOztBQUUxQyxpREFBVzs7QUFFWCwrQ0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvX2RvX2xpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvX2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvX2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b19kb19saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhZGRUb1N0b3JhZ2UsIFxufSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHtUb2RvLCB1bndyYXBBbmRNYWtlVG9kb30gZnJvbSAnLi90b2RvJztcblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCB0b2RvSXRlbUxpc3QsIGluZGV4KSB7XG5cbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50b2RvSXRlbUxpc3QgPSB0b2RvSXRlbUxpc3Q7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuaGFzaFNldCA9IHt9O1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9kb0l0ZW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHRoaXMuaGFzaFNldFtgJHt0aGlzLnRvZG9JdGVtTGlzdFtpXS5nZXRJbmRleCgpfWBdID1cbiAgICAgICAgdGhpcy50b2RvSXRlbUxpc3RbaV07XG4gICAgfVxuICB9XG5cblxuICByZXNldEhhc2hTZXQoKSB7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9kb0l0ZW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHRoaXMuaGFzaFNldFtgJHt0aGlzLnRvZG9JdGVtTGlzdFtpXS5nZXRJbmRleCgpfWBdID1cbiAgICAgICAgdGhpcy50b2RvSXRlbUxpc3RbaV07XG5cbiAgICB9XG4gIH1cbiAgXG5cblxuICBhZGRUb0l0ZW1zKHRvZG9JdGVtKSB7XG5cbiAgICB0aGlzLnRvZG9JdGVtTGlzdC5wdXNoKHRvZG9JdGVtKTtcbiAgICBhZGRUb1N0b3JhZ2UodGhpcyk7XG4gICAgdGhpcy5yZXNldEhhc2hTZXQoKTtcblxuICB9XG5cblxuICByZW1vdmVJdGVtQnlUaXRsZSh0b2RvVGl0bGUpIHtcblxuICAgIGxldCBuZXdBcnJheSA9IFtdO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9kb0l0ZW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGlmKHRvZG9UaXRsZSA9PSB0aGlzLnRvZG9JdGVtTGlzdFtpXS5nZXRUaXRsZSgpKSBjb250aW51ZTtcblxuICAgICAgbmV3QXJyYXkucHVzaCh0aGlzLnRvZG9JdGVtTGlzdFtpXSk7XG5cbiAgICB9XG5cbiAgICB0aGlzLnRvZG9JdGVtTGlzdCA9IG5ld0FycmF5O1xuICAgIGFkZFRvU3RvcmFnZSh0aGlzKTtcblxuICAgIFxuICB9XG5cblxuICByZW1vdmVJdGVtQnlJbmRleCh0b2RvSW5kZXgpIHtcblxuICAgIGxldCBuZXdBcnJheSA9IFtdO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9kb0l0ZW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGlmKHRvZG9JbmRleCA9PSB0aGlzLnRvZG9JdGVtTGlzdFtpXS5nZXRJbmRleCgpKSBjb250aW51ZTtcblxuICAgICAgbmV3QXJyYXkucHVzaCh0aGlzLnRvZG9JdGVtTGlzdFtpXSk7XG5cbiAgICB9XG5cbiAgICB0aGlzLnRvZG9JdGVtTGlzdCA9IG5ld0FycmF5O1xuICAgIGFkZFRvU3RvcmFnZSh0aGlzKTtcblxuICAgIFxuICB9XG4gIFxuXG4gIGdldFRvZG9zKCkge1xuXG4gICAgcmV0dXJuIHRoaXMudG9kb0l0ZW1MaXN0O1xuICAgIFxuICB9XG5cbiAgXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICB9XG5cblxuICBnZXRMZW5ndGgoKSB7XG5cbiAgICByZXR1cm4gdGhpcy50b2RvSXRlbUxpc3QubGVuZ3RoO1xuXG4gIH1cblxuXG4gIGdldEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xuICB9XG5cblxuICBzZXRJbmRleChpbmRleCkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxuXG5cbiAgaW5kZXhFeGlzdHMoaW5kZXgpIHtcblxuICAgIGlmIChpbmRleCBpbiB0aGlzLmhhc2hTZXQpIHtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBcbiAgICB9XG4gIH1cblxuICBcbiAgXG4gIGdldFRvZG9CeUluZGV4KGluZGV4KSB7XG5cbiAgICBsZXQgdG9kb0l0ZW0gPSB7fTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRvZG9JdGVtTGlzdC5sZW5ndGg7IGkrKykge1xuXG4gICAgICBpZihpbmRleCA9PSB0aGlzLnRvZG9JdGVtTGlzdFtpXS5nZXRJbmRleCgpKSB7XG5cbiAgICAgICAgdG9kb0l0ZW0gPSB0aGlzLnRvZG9JdGVtTGlzdFtpXTtcblxuICAgICAgfSBcbiAgICB9XG5cbiAgICByZXR1cm4gdG9kb0l0ZW07XG5cbiAgfVxuXG5cbiAgZ2V0VG9kb0J5VGl0bGUodGl0bGUpIHtcblxuICAgIGxldCB0b2RvSXRlbSA9IHt9O1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9kb0l0ZW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGlmKHRpdGxlID09IHRoaXMudG9kb0l0ZW1MaXN0W2ldLmdldFRpdGxlKCkpIHtcblxuICAgICAgICB0b2RvSXRlbSA9IHRoaXMudG9kb0l0ZW1MaXN0W2ldO1xuXG4gICAgICB9IFxuICAgIH1cbiAgICByZXR1cm4gdG9kb0l0ZW07XG5cbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0IChwcm9qVGl0bGUsIGkpIHtcblxuICBpZiAocHJvalRpdGxlID09IFwiXCIpIHtcblxuICAgIHJldHVybjtcblxuICB9XG5cbiAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2pUaXRsZSwgW10sIGkpO1xuICBhZGRUb1N0b3JhZ2UobmV3UHJvamVjdCk7XG5cbiAgXG4gIHJldHVybiBuZXdQcm9qZWN0O1xuXG59XG5cbiIsImltcG9ydCB7VG9kbywgdW53cmFwQW5kTWFrZVRvZG99IGZyb20gJy4vdG9kbyc7XG5pbXBvcnQge1Byb2plY3R9IGZyb20gJy4vcHJvamVjdHMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb1N0b3JhZ2UocHJvamVjdCkge1xuXG4gIGNvbnN0IHN0b3JhZ2VLZXkgPSBwcm9qZWN0LmdldFRpdGxlKCk7XG4gIGNvbnN0IHN0b3JhZ2VWYWx1ZSA9IFxuICAgIEpTT04uc3RyaW5naWZ5KHtjb250ZW50OiBKU09OLnN0cmluZ2lmeShwcm9qZWN0LmdldFRvZG9zKCkpLCBpbmRleDogcHJvamVjdC5nZXRJbmRleCgpfSk7XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgc3RvcmFnZVZhbHVlKTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdEZyb21TdG9yYWdlKGtleSkge1xuICBcbiAgY29uc3Qgc3RvcmFnZUNvbnRlbnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICBjb25zdCBpdGVtcyA9IEpTT04ucGFyc2Uoc3RvcmFnZUNvbnRlbnQuY29udGVudCk7XG5cbiAgXG4gIGNvbnN0IHRvZG9JdGVtcyA9IHVud3JhcEFuZE1ha2VUb2RvKGl0ZW1zKTtcblxuICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3Qoa2V5LCB0b2RvSXRlbXMsIEpTT04ucGFyc2Uoc3RvcmFnZUNvbnRlbnQuaW5kZXgpKTtcbiAgcmV0dXJuIHByb2plY3Q7XG4gIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGl0bGVGcm9tU3RvcmFnZShwcm9qZWN0KSB7XG5cbiAgY29uc3QgcHJvak9iamVjdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ocHJvamVjdC5nZXRUaXRsZSgpKSk7XG5cbiAgY29uc29sZS5sb2coXCJmaXggdGhpcz9cIik7XG4gIHJldHVybiBwcm9qT2JqZWN0LnRpdGxlO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50RnJvbVN0b3JhZ2Uoa2V5KSB7XG4gIFxuICBjb25zdCBzdG9yYWdlQ29udGVudCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gIGNvbnN0IGl0ZW1zID0gSlNPTi5wYXJzZShzdG9yYWdlQ29udGVudC5jb250ZW50KTtcbiAgXG4gIGNvbnN0IHRvZG9JdGVtcyA9IHVud3JhcEFuZE1ha2VUb2RvKGl0ZW1zKTtcblxuICByZXR1cm4gdG9kb0l0ZW1zO1xuICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluZGV4RnJvbVN0b3JhZ2Uoa2V5KSB7XG4gIFxuICBjb25zdCBzdG9yYWdlQ29udGVudCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gIHJldHVybiBzdG9yYWdlQ29udGVudC5pbmRleDtcbiAgXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbFByb2plY3RzRnJvbVN0b3JhZ2UgKCkge1xuICBcbiAgbGV0IHJldHVybkFycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcblxuICAgIGZvcihsZXQgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGxvY2FsU3RvcmFnZSkpICB7XG5cbiAgICAgIGNvbnN0IGl0ZW0gPSAoSlNPTi5wYXJzZSh2YWx1ZSkpO1xuXG4gICAgICBpZihpdGVtLmluZGV4ID09IGkpIHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdEZyb21TdG9yYWdlKGtleSk7XG4gICAgICAgIHJldHVybkFycmF5LnB1c2gocHJvamVjdCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgICByZXR1cm4gcmV0dXJuQXJyYXk7XG4gIFxufVxuXG5cbiIsImV4cG9ydCBjbGFzcyBUb2RvIHtcblxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHByaW9yaXR5LCBjb21wbGV0ZSwgdG9kb0luZGV4KSB7XG5cbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlZGF0ZSA9IGR1ZWRhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgICB0aGlzLnRvZG9JbmRleCA9IHRvZG9JbmRleFxuXG4gIH1cblxuXG4gIHNldERhdGUobmV3RGF0ZSkge1xuXG4gICAgdGhpcy5kdWVkYXRlID0gbmV3RGF0ZTtcbiAgICBcbiAgfVxuXG5cbiAgZ2V0KCkge1xuXG4gICAgY29uc3QgdG9kb1BhY2thZ2UgPSB7dGl0bGU6IHRoaXMudGl0bGUsIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLCBkdWVkYXRlOiB0aGlzLmR1ZWRhdGUsIHByaW9yaXR5OiB0aGlzLnByaW9yaXR5LCBjb21wbGV0ZTogdGhpcy5jb21wbGV0ZSwgdG9kb0luZGV4OiB0aGlzLnRvZG9JbmRleH07XG4gICAgXG4gICAgcmV0dXJuIHRvZG9QYWNrYWdlO1xuICAgIFxuICB9XG5cblxuICBnZXRJbmRleCgpIHtcblxuICAgIHJldHVybiB0aGlzLnRvZG9JbmRleDtcblxuICB9XG5cblxuICBnZXRUaXRsZSgpIHtcbiAgICBcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcblxuICB9XG5cblxuICBnZXRDb2xvcigpIHtcblxuICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICAgIFxuICB9XG5cblxuICBnZXREYXRlKCkge1xuICAgIFxuICAgIHJldHVybiB0aGlzLmR1ZWRhdGU7XG5cbiAgfVxuXG5cbiAgZ2V0RGVzYygpIHtcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgfVxuXG5cbiAgc2V0RGVzYyhuZXdEZXNjKSB7XG5cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzYztcbiAgICBcbiAgfVxuICBcbiAgXG5cbn1cblxuLy8gVGFrZXMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhbmQgcmV0dXJucyBhcnJheSBvZiB0b2RvIGl0ZW1zLlxuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcEFuZE1ha2VUb2RvICh0b2RvSXRlbUxpc3QpIHtcbiAgXG4gIGxldCBhcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb0l0ZW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICBsZXQgaXRlbSA9IG5ldyBUb2RvKHRvZG9JdGVtTGlzdFtpXS50aXRsZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvSXRlbUxpc3RbaV0uZGVzY3JpcHRpb24sIFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb0l0ZW1MaXN0W2ldLmR1ZWRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvSXRlbUxpc3RbaV0ucHJpb3JpdHksICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvSXRlbUxpc3RbaV0uY29tcGxldGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvSXRlbUxpc3RbaV0udG9kb0luZGV4KTsgXG4gICAgYXJyYXkucHVzaChpdGVtKVxuXG4gIH1cblxuICByZXR1cm4gYXJyYXk7XG5cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtUb2RvfSBmcm9tICcuL3RvZG8nO1xuaW1wb3J0IHtQcm9qZWN0fSBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB7XG4gIGFkZFRvU3RvcmFnZSwgXG4gIGdldEFsbFByb2plY3RzRnJvbVN0b3JhZ2Vcbn0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7XG4gIHNldFRvZG9MaXN0LFxuICBhZGRUb2RvQnV0dG9uLFxuICBhZGRQcm9qQnV0dG9uLFxuICBwb3B1bGF0ZVByb2plY3RzLCBcbiAgYWRkRXZlbnRzLFxufSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IGZpbGwgPSBmdW5jdGlvbiBmaWxsRGVmYXVsdCgpIHtcblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZGVmYXVsdFRvZG8gPSBuZXcgVG9kbyhcIkV4YW1wbGUgVG9kbyBJdGVtXCIsIFwiRXhhbXBsZSBEZXNjcmlwdGlvblwiLCBkYXRlLCBcIlRvbWF0b1wiLCBcImZhbHNlXCIsIFwiMFwiKTtcbiAgY29uc3QgZGVmYXVsdFRvZG8yID1uZXcgVG9kbyhcIkV4YW1wbGUgMiBUb2RvIEl0ZW1cIiwgXCJFeGFtcGxlIERlc2NyaXB0aW9uXCIsIGRhdGUsIFwiVG9tYXRvXCIsIFwiZmFsc2VcIiwgXCIxXCIpO1xuICBjb25zdCBkZWZhdWx0VG9kbzMgPW5ldyBUb2RvKFwiRXhhbXBsZSAzIFRvZG8gSXRlbVwiLCBcIkV4YW1wbGUgRGVzY3JpcHRpb25cIiwgZGF0ZSwgXCJUb21hdG9cIiwgXCJmYWxzZVwiLCBcIjFcIik7XG4gIGNvbnN0IGRlZmF1bHRQcm9qID0gbmV3IFByb2plY3QoXCJEZWZhdWx0IFByb2plY3RcIixbZGVmYXVsdFRvZG8sIGRlZmF1bHRUb2RvMl0sIDApO1xuICBjb25zdCBkZWZhdWx0UHJvajIgPSBuZXcgUHJvamVjdChcIkRlZmF1bHQgUHJvamVjdDJcIixbZGVmYXVsdFRvZG8sIGRlZmF1bHRUb2RvM10sIDEpO1xuXG4gIGFkZFRvU3RvcmFnZShkZWZhdWx0UHJvaik7XG4gIGFkZFRvU3RvcmFnZShkZWZhdWx0UHJvajIpO1xuICBcbn1cblxuXG5kb2N1bWVudC5ib2R5LnN0eWxlID0gXCJkaXNwbGF5OiBncmlkOyBwYWRkaW5nOiAwOyBtYXJnaW46IDA7IGdyaWQtdGVtcGxhdGU6IDEwMHZoLyAxZnIgM2ZyOyBmb250LXNpemU6IDI4cHg7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7IGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBzYW5zLXNlcmlmOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1jb250ZW50OiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyO1wiXG5cbmNvbnN0IHByb2pDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xucHJvakNvbnRhaW5lci5pZCA9IFwicHJvai1jb250YWluZXJcIjtcbnByb2pDb250YWluZXIuc3R5bGUgPSBcInBhZGRpbmctbGVmdDogMzVweDsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcIjtcblxuY29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG50b2RvQ29udGFpbmVyLmlkID0gXCJ0b2RvLWNvbnRhaW5lclwiO1xudG9kb0NvbnRhaW5lci5zdHlsZSA9IFwicGFkZGluZy1sZWZ0OiAzNXB4O1wiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb2pDb250YWluZXIpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTtcblxuXG5jb25zdCBwcm9qRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnByb2pEaXYuaWQgPSBcInByb2otZGl2XCI7XG5cblxuY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG50b2RvRGl2LmlkID0gXCJ0b2RvLWRpdlwiO1xuXG5wcm9qQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2pEaXYpO1xudG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvRGl2KTtcblxuYWRkVG9kb0J1dHRvbigpO1xuYWRkUHJvakJ1dHRvbigpO1xuXG5jb25zdCBwcm9qSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xucHJvakhlYWRlci50ZXh0Q29udGVudCA9IFwiUHJvamVjdHNcIlxucHJvakhlYWRlci5zdHlsZSA9IFwiZm9udC1zaXplOiAxLjdyZW07XCI7XG5wcm9qRGl2LmFwcGVuZENoaWxkKHByb2pIZWFkZXIpO1xuXG4vLyBBZGQgZGVmYXVsdC5cbmlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID09IDEgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkZWJ1Z1wiKSAhPSBudWxsKSB7XG5cbiAgZmlsbCgpO1xuICBcbn1cblxucG9wdWxhdGVQcm9qZWN0cyhnZXRBbGxQcm9qZWN0c0Zyb21TdG9yYWdlKCkpO1xuXG5zZXRUb2RvTGlzdCgpO1xuXG5hZGRFdmVudHMoKTtcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9