import {Todo, unwrapAndMakeTodo} from './todo';
import {Project, createNewProject} from './projects';
import {
  addToStorage, 
  getProjectFromStorage,
  getTitleFromStorage,
  getContentFromStorage,
  getIndexFromStorage,
  getAllProjectsFromStorage
} from './storage';
import {
  setTodoList,
  addTodoButton,
  addProjButton,
  populateProjects, 
  populateTodoList,
  addEvents,
} from './dom';

const fill = function fillDefault() {

  const defaultTodo = new Todo("Example Todo Item", "Example Description", "2024-08-04", "Tomato", "false", "0");
  const defaultTodo2 =new Todo("Example 2 Todo Item", "Example Description", "15-06-21", "Tomato", "false", "1");
  const defaultTodo3 =new Todo("Example 3 Todo Item", "Example Description", "15-06-21", "Tomato", "false", "1");
  const defaultProj = new Project("Default Project",[defaultTodo, defaultTodo2], 0);
  const defaultProj2 = new Project("Default Project2",[defaultTodo, defaultTodo3], 1);

  addToStorage(defaultProj);
  addToStorage(defaultProj2);
  
}


document.body.style = "display: grid; padding: 0; margin: 0; grid-template: 100vh/ 1fr 3fr; font-size: 28px; background-color: whitesmoke"

const projContainer = document.createElement("div");
projContainer.id = "proj-container";
projContainer.style = "padding-left: 35px;";

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

addTodoButton();
addProjButton();

const projHeader = document.createElement("h2");
projHeader.textContent = "Projects"
projDiv.appendChild(projHeader);

// Add default.
fill();

populateProjects(getAllProjectsFromStorage());

setTodoList();

addEvents();




