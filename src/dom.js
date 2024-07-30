import {Projects, createNewProject} from './projects';
import Todo from './todo';
import {addToStorage, getFromStorage, getTitleFromStorage} from './storage';

export function startUp(startUpProjects) {

  document.body.style = "display: grid; padding: 0; margin: 0; grid-template: 100vh/ 1fr 3fr; font-size: 28px;"

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
  addButtons();

  const projHeader = document.createElement("h2");
  projHeader.textContent = "Projects"
  projDiv.appendChild(projHeader);



  addEvents();
  
  
    const defaultTodo = new Todo("Example Todo Item", "Example Description", "14-06-21", "red", "false");
    const defaultTodo2 = new Todo("Example 2 Todo Item", "Example Description", "15-06-21", "red", "false");
    const defaultProj = new Projects("Default Project",[defaultTodo, defaultTodo2], 0);
    const defaultProj2 = new Projects("Default Project2",[defaultTodo, defaultTodo2], 1);

    addToStorage(defaultProj);
    addToStorage(defaultProj2);

    populateProjects([defaultProj, defaultProj2]);
    populateTodoList(defaultProj);



}


export function populateProjects (listOfProjects) {
  
  const projDiv = document.querySelector("#proj-div");

  if (projDiv.childNodes.length == 2) {

    projDiv.removeChild(projDiv.lastChild);
    
  }
  
  const projList = document.createElement("ul");
  projList.id = "proj-list"
  projList.style = "list-style-type: none; margin: 0; padding: 0;";

  for (let i = 0; i < listOfProjects.length; i++) {

    const projListItem = document.createElement("li");
    const projButton = document.createElement("button");

    projButton.textContent =
      listOfProjects[i].getTitle();

    projButton.style =
      "border: none; font-size: 1.3rem;";
    projButton.class = "project-expand";

    const key = listOfProjects[i].getTitle();
    projButton.id = `${key}`;
    projButton.value = `${i}`;

    projListItem.appendChild(projButton);
    projList.appendChild(projListItem);
    
  }
  
  projDiv.appendChild(projList);
  
}


export function populateTodoList (project) {

  const todoHeader = document.createElement("h2");
  const todoDiv = document.querySelector("#todo-div");
  const todoList = document.createElement("ul");
  
  todoHeader.textContent = `${project.getTitle()}`;
  todoHeader.id = "todo-header";

  for (let i = 0; i < project.getLength(); i++) {
    const todoListItem = document.createElement("li");
    todoListItem.style = "list-style-type: none;";

    makeTodoItemTitle(project, i, todoListItem);

    todoList.appendChild(todoListItem);
    
  }
  todoDiv.appendChild(todoHeader);
  todoDiv.appendChild(todoList);

}


function makeTodoItemTitle (project, index, currentListItem) {

  const todoButton = document.createElement("button");
  todoButton.textContent = getTitleFromStorage(project);
  // todoButton.textContent = JSON.parse(localStorage.getItem(key))[0][index].title;
  todoButton.id = `${index}`; 
  todoButton.class = "todo-item-title"; 
  todoButton.style =
    "border: none; font-size: 1.5rem";

  currentListItem.appendChild(todoButton);
  
}


function makeTodoItemCard (key, index, currentListItem) {

  const todoCard = document.createElement("div");
  todoCard.class = "todo-card";
  todoCard.id = `${index}`;

  const item = JSON.parse(localStorage.getItem(key))[0][index];

  const todoCardTitle = document.createElement("p");
  todoCardTitle.textContent = item.title;
  todoCardTitle.class = "todo-element";

  const todoCardDesc = document.createElement("p");
  todoCardDesc.textContent = item.description;
  todoCardDesc.class = "todo-element";

  const todoCardDate = document.createElement("p");
  todoCardDate.textContent = item.duedate;
  todoCardDate.class = "todo-element";

  const todoCardPriority = document.createElement("p");
  todoCardPriority.textContent = item.priority;
  todoCardPriority.class = "todo-element";

  const todoCardComplete = document.createElement("p");
  todoCardComplete.textContent = item.complete;
  todoCardComplete.class = "todo-element";

  currentListItem.appendChild(todoCard);

  todoCard.appendChild(todoCardTitle);
  todoCard.appendChild(todoCardDate);
  todoCard.appendChild(todoCardDesc);
  todoCard.appendChild(todoCardPriority);
  todoCard.appendChild(todoCardComplete);
  
}


function addEvents() {
  
  const projDiv = 
    document.querySelector("#proj-container");
  const todoDiv = 
    document.querySelector("#todo-container");

  todoDiv.addEventListener("click", expandItem);
  projDiv.addEventListener("click", expandProject);

}


function expandItem(event) {
  
  const key = document.querySelector("#todo-header").textContent;
  let index = event.target.id;

  if(event.target.class == "todo-item-title") {

    makeTodoItemCard(key, index, event.target.parentNode);
    event.target.remove();
    
  } else if (event.target.class == "todo-card") {

    makeTodoItemTitle(key, index, event.target.parentNode);
    event.target.remove();
    
  } else if (event.target.class = "todo-element") {
    index = event.target.parentNode.id;

    makeTodoItemTitle(key, index, event.target.parentNode.parentNode);
    event.target.parentNode.remove();

    
  }
}
//fix projects
function expandProject (event) {

  if (event.target.class == "project-expand") {

    const todoList = document.querySelector("#todo-div");
    const key = event.target.id

    const project = new Projects (`${key}`,
      JSON.parse(localStorage.getItem(key))[0]);

    while (todoList.hasChildNodes()) {

      todoList.removeChild(todoList.firstChild);

    }

    populateTodoList(project);
  }
}

function addButtons () {

  const projContainer = document.querySelector("#proj-container");
  const todoContainer = document.querySelector("#todo-container");

  const addProjButton = document.createElement("button");
  addProjButton.id = "proj-button";
  addProjButton.textContent = "Add Project";

  const addTodoButton = document.createElement("button");
  addTodoButton.id = "todo-button";
  addTodoButton.textContent = "Add Project";

  projContainer.appendChild(addProjButton);
  todoContainer.appendChild(addTodoButton);

  addProjButton.addEventListener("click", projButtonOnClick);

}

function projButtonOnClick(event) {

    const projContainer = document.querySelector("#proj-container");

    const projForm = document.createElement("form");

    const projInputLabel = document.createElement("label");
    projInputLabel.setAttribute("for", "proj-input");

    const projInput = document.createElement("input");
    projInput.id = "proj-input";
    projInput.setAttribute("type", "text");
    projInput.setAttribute("placeholder", "New Project");
    projInput.setAttribute("value", "");

    const projInputSubmit = document.createElement("button");
    projInputSubmit.textContent = "Create";
    projInputSubmit.id = "proj-submit";

    projForm.appendChild(projInputLabel);
    projForm.appendChild(projInput);
    projForm.appendChild(projInputSubmit);

    projContainer.insertBefore(projForm, projContainer.children[1]);

    projInputSubmit.addEventListener("click", onClickProjInputSubmit);

}

function onClickProjInputSubmit(event) {
  
  event.preventDefault();
  const projInput = document.querySelector("#proj-input");
  const projList = document.querySelector("#proj-list");

  if (projList.hasChildNodes) {

    let index = projList.children.length + 1;   
    
  } else {
    let index = 0;
  }

  populateProjects(createNewProject(projInput.value, index));

  const projForm = document.querySelector("form");
  projForm.remove();


}

