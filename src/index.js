import {Todo} from './todo';
import {Project} from './projects';
import {
  addToStorage, 
  getAllProjectsFromStorage
} from './storage';
import {
  setTodoList,
  addTodoButton,
  addProjButton,
  populateProjects, 
  addEvents,
} from './dom';

const fill = function fillDefault() {

  const date = new Date();
  const defaultTodo = new Todo("Example Todo Item", "Example Description", date, "Tomato", "false", "0");
  const defaultTodo2 =new Todo("Example 2 Todo Item", "Example Description", date, "Tomato", "false", "1");
  const defaultTodo3 =new Todo("Example 3 Todo Item", "Example Description", date, "Tomato", "false", "1");
  const defaultProj = new Project("Default Project",[defaultTodo, defaultTodo2], 0);
  const defaultProj2 = new Project("Default Project2",[defaultTodo3], 1);

  addToStorage(defaultProj);
  addToStorage(defaultProj2);
  
}


document.body.style = "display: grid; padding: 0; margin: 0; grid-template: 100vh/ 1fr 3fr; font-size: 28px; background-color: antiquewhite; font-family: Verdana, sans-serif; display: flex; align-content: center; justify-content: center;"

const projContainer = document.createElement("div");
projContainer.id = "proj-container";
projContainer.style = "padding-left: 35px; display: flex; flex-direction: column;";

const todoContainer = document.createElement("div");
todoContainer.id = "todo-container";
todoContainer.style = "padding-left: 35px; display: flex; flex-direction: column;";

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
projHeader.style = "font-size: 1.7rem;";
projDiv.appendChild(projHeader);

// Add default.
if ((localStorage.length == 1 && localStorage.getItem("debug") != null) || localStorage.length == 0) {

  fill();
  
}

populateProjects(getAllProjectsFromStorage());

setTodoList();

addEvents();




