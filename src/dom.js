import {Project,
  createNewProject} from './projects';
import {Todo, unwrapAndMakeTodo} from './todo';
import {addToStorage, 
  getFromStorage,
  getTitleFromStorage,
  getContentFromStorage,
  getIndexFromStorage,
  getProjectsFromStorage
} from './storage';

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



  
  
  const defaultTodo = new Todo("Example Todo Item", "Example Description", "14-06-21", "red", "false", "0");
  const defaultTodo2 =new Todo("Example 2 Todo Item", "Example Description", "15-06-21", "red", "false", "1");
  const defaultTodo3 =new Todo("Example 3 Todo Item", "Example Description", "15-06-21", "red", "false", "1");
  const defaultProj = new Project("Default Project",[defaultTodo, defaultTodo2], 0);
  const defaultProj2 = new Project("Default Project2",[defaultTodo, defaultTodo3], 1);

  addToStorage(defaultProj);
  addToStorage(defaultProj2);

  populateProjects(getProjectsFromStorage());

  setTodoList();

  addEvents();

}

function setTodoList () {
  
  if (localStorage.length == 0) {
    const project = 0;
    populateTodoList(project);
    return;
  }
  const key = document.querySelector("#proj-list").firstChild.lastChild.id;
  populateTodoList(getFromStorage(key));

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
    const projDeleter = document.createElement("button");
    projDeleter.style = "height: 1rem; margin: 4px;";
    projDeleter.class = "proj-deleter";
    
    const projButton = document.createElement("button");

    projButton.textContent =
      listOfProjects[i].getTitle();

    projButton.style =
      "border: none; font-size: 1.3rem;";
    projButton.class = "project-expand";

    const key = listOfProjects[i].getTitle();
    projButton.id = `${key}`;
    projButton.value = `${i}`;
    projDeleter.value = `${key}`;

    projListItem.appendChild(projDeleter);
    projListItem.appendChild(projButton);
    projList.appendChild(projListItem);
    
  }
  
  projDiv.appendChild(projList);
  
}


export function populateTodoList (project) {

  const prevContent =
    document.querySelector("#todo-div");

  while (prevContent.hasChildNodes()) {

    prevContent.removeChild(prevContent.firstChild);
    
  }

  
  const todoHeader = document.createElement("h2");
  const todoDiv = document.querySelector("#todo-div");
  const todoList = document.createElement("ul");
  todoList.id = "todo-list";

  if (project == 0) {
    
    const todoHeader = document.createElement("h2");
    todoHeader.textContent = "To do list";
    todoDiv.appendChild(todoHeader);
    return;

  }
  
  todoHeader.textContent = `${project.getTitle()}`;
  todoHeader.id = "todo-header";
  let count = project.getLength();

  let i = 0;

  while (count > 0) {

    if(project.indexExists(i)) {

      const listItem = document.createElement("li");
      listItem.style = "list-style-type: none;";

      makeTodoItemTitle(project.getByIndex(i), listItem);

      todoList.appendChild(listItem);

      console.log('i:',i);
      console.log(`hello: ${i}`);
      count--;
      console.log("count: ",count);

    }
    i++
    if (i > 500) {
      console.log("failure");
      alert("over 500");
      break;
    }
    
  }

  todoDiv.appendChild(todoHeader);
  todoDiv.appendChild(todoList);



}


function makeTodoItemTitle (todoItem, currentListItem) {

  const index = todoItem.getIndex();

  const todoDeleter = document.createElement("button");
  todoDeleter.style = "height: 1rem; margin: 4px; border-radius: 50%;";
  todoDeleter.class = "todo-deleter";
  todoDeleter.value = index;
  const todoButton = document.createElement("button");

  todoButton.textContent = todoItem.getTitle();
  todoButton.id = index; 
  todoButton.class = "todo-item-title"; 
  todoButton.style =
    "border: none; font-size: 1.5rem";

  currentListItem.appendChild(todoDeleter);
  currentListItem.appendChild(todoButton);
  
}


function makeTodoItemCard (todoItem, currentListItem) {

  const index = todoItem.getIndex();

  const todoDeleter = document.createElement("button");
  todoDeleter.style = "height: 1rem; margin: 4px;";
  todoDeleter.class = "todo-deleter";
  todoDeleter.value = index;

  const todoCard = document.createElement("div");
  todoCard.class = "todo-card";
  todoCard.id = index;

  const item = todoItem.get();

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

  currentListItem.appendChild(todoDeleter);
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

  todoDiv.addEventListener("click", todoOnClick);
  projDiv.addEventListener("click", projOnClick);


}

function projOnClick(event) {

  if (event.target.class == "project-expand") {

    const todoList = document.querySelector("#todo-div");
    const key = event.target.id;

    const project = new Project (key, getContentFromStorage(key), getIndexFromStorage(key));

    while (todoList.hasChildNodes()) {

      todoList.removeChild(todoList.firstChild);

    }

    populateTodoList(project);
  } else if (event.target.class == "proj-deleter") {
    deleteProject(event);
    
  } else {

    return;

  }
  
}

function todoOnClick(event) {
  
  const key = document.querySelector("#todo-header").textContent;
  const project = getFromStorage(key);
  let index = event.target.id;
  let item = project.getByIndex(index);
  let listItem = event.target.parentNode;

  if(event.target.class == "todo-item-title") {

    while (listItem.hasChildNodes()) {

      listItem.removeChild(listItem.firstChild);

    }

    makeTodoItemCard(item, listItem);
    
  } else if (event.target.class == "todo-card") {

    while (listItem.hasChildNodes()) {

      listItem.removeChild(listItem.firstChild);

    }

    makeTodoItemTitle(item, listItem);

    
  } else if (event.target.class == "todo-element") {
    
    index = event.target.parentNode.id;
    item = project.getByIndex(index);
    listItem = event.target.parentNode.parentNode;


    while (listItem.hasChildNodes()) {

      listItem.removeChild(listItem.firstChild);

    }

    makeTodoItemTitle(item, listItem);
    
  } else if (event.target.class == "todo-deleter") {

    deleteTodo(event);
    
  } else {

    return;

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
  addTodoButton.textContent = "Add Todo";

  projContainer.appendChild(addProjButton);
  todoContainer.appendChild(addTodoButton);

  addProjButton.addEventListener("click", createProjForm);
  addTodoButton.addEventListener("click", createTodoForm);

}

function createProjForm(event) {

    const projContainer = document.querySelector("#proj-container");

    const projForm = document.createElement("form");
    projForm.id = ("proj-form");

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

    projInputSubmit.addEventListener("click", projSubmit);

}

function projSubmit(event) {
  
  event.preventDefault();
  const projInput = document.querySelector("#proj-input");
  const projList = document.querySelector("#proj-list");

  let index = 0;

  if (projList.hasChildNodes()) {

    index = projList.children.length;   
  }

  const newProj = createNewProject(projInput.value, index);

  populateProjects(getProjectsFromStorage());

  const projForm = document.querySelector("#proj-form");
  projForm.remove();


}


function createTodoForm(event) {

    const todoContainer = document.querySelector("#todo-container");

    const todoForm = document.createElement("form");
    todoForm.id = ("todo-form");

    const todoInputLabel = document.createElement("label");
    todoInputLabel.setAttribute("for", "todo-input");

    const todoInput = document.createElement("input");
    todoInput.id = "todo-input";
    todoInput.setAttribute("type", "text");
    todoInput.setAttribute("placeholder", "New Todo");
    todoInput.setAttribute("value", "");

    const todoInputSubmit = document.createElement("button");
    todoInputSubmit.textContent = "Create";
    todoInputSubmit.id = "todo-submit";

    todoForm.appendChild(todoInputLabel);
    todoForm.appendChild(todoInput);
    todoForm.appendChild(todoInputSubmit);

    todoContainer.insertBefore(todoForm, todoContainer.children[1]);

    todoInputSubmit.addEventListener("click", todoSubmit);

}

function todoSubmit(event) {
  
  event.preventDefault();

  const title = document.querySelector("#todo-input").value;
  const todoList = document.querySelector("#todo-list");

  const key = document.querySelector("#todo-header").textContent;
  const project = getFromStorage(key);

  let index = 0;

  if (todoList.hasChildNodes()) {

    index = todoList.children.length;   
    
  }

  const newTodo = new Todo(title,"Hello Descript", "14-06-21", "red", "false", index);

  project.addToItems(newTodo);
  populateTodoList(project);

  const todoForm = document.querySelector("#todo-form");
  todoForm.remove();


}

function deleteProject (event) {

  const key = event.target.value;
  localStorage.removeItem(key);

  event.target.parentNode.remove();
  setTodoList();
  
}

function deleteTodo (event) {

  const key =
    document.querySelector("#todo-header").textContent;
  const project = getFromStorage(key);
  const index = event.target.value;

  project.removeItem(index);

  const todoListItem =event.target.parentNode;
  while (todoListItem.hasChildNodes()) {

    todoListItem.removeChild(todoListItem.firstChild);

  }

}

