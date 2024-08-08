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


export function setTodoList () {
  
  if (localStorage.length == 0) {
    const project = 0;
    populateTodoList(project);
    return;
  }
  const key = document.querySelector("#proj-list").firstChild.lastChild.id;
  populateTodoList(getFromStorage(key));

}


export function addTodoButton() {
  
  const todoContainer = document.querySelector("#todo-container");

  const addTodoButton = document.createElement("button");
  addTodoButton.id = "todo-button";
  addTodoButton.textContent = "Add Todo";

  todoContainer.appendChild(addTodoButton);

  addTodoButton.addEventListener("click", createTodoForm);

}


export function addProjButton() {

  const projContainer = document.querySelector("#proj-container");

  const addProjButton = document.createElement("button");
  addProjButton.id = "proj-button";
  addProjButton.textContent = "Add Project";

  projContainer.appendChild(addProjButton);

  addProjButton.addEventListener("click", createProjForm);

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
      listItem.style = "list-style-type: none; display: flex;";

      makeTodoItemTitle(project.getByIndex(i), listItem);

      todoList.appendChild(listItem);

      count--;

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


export function addEvents() {
  
  const projDiv = 
    document.querySelector("#proj-container");
  const todoDiv = 
    document.querySelector("#todo-container");

  todoDiv.addEventListener("click", todoOnClick);
  projDiv.addEventListener("click", projOnClick);

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
    `border: none; font-size: 1.5rem; background-color: ${todoItem.getColor()}`;

  currentListItem.appendChild(todoDeleter);
  currentListItem.appendChild(todoButton);
  
}


function makeTodoItemCard (todoItem, currentListItem) {

  const index = todoItem.getIndex();

  const todoDeleter = document.createElement("button");
  todoDeleter.style = "height: 1rem; margin: 4px; border-radius: 50%;";
  todoDeleter.class = "todo-deleter";
  todoDeleter.value = index;

  const todoCard = document.createElement("div");
  todoCard.class = "todo-card";
  todoCard.id = index;
  const color = todoItem.getColor();

  const item = todoItem.get();

  const todoCardTitle = document.createElement("p");
  todoCardTitle.textContent = item.title;
  todoCardTitle.class = "todo-element";
  todoCardTitle.style = `background-color: ${color};`

  const todoCardDesc = document.createElement("p");
  todoCardDesc.textContent = item.description;
  todoCardDesc.class = "todo-element";

  // Date form
  const dateForm = document.createElement("form");
  dateForm.id = "date-form";
  dateForm.style = "display: flex; flex-direction: column;";

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "date-input");
  dateLabel.textContent = "Due: ";

  const date = document.createElement("input");
  date.setAttribute("type", "date");
  const storedDate = todoItem.getDate();
  date.value = storedDate;
  date.name = "duedate";
  date.id = "date-input";

  const dateSubmit = document.createElement("button");
  dateSubmit.textContent = "Set Date";

  dateForm.appendChild(dateLabel);
  dateForm.appendChild(date);
  dateForm.appendChild(dateSubmit);


  const todoCardPriority = document.createElement("p");
  todoCardPriority.textContent = item.priority;
  todoCardPriority.class = "todo-element";

  const todoCardComplete = document.createElement("p");
  todoCardComplete.textContent = item.complete;
  todoCardComplete.class = "todo-element";

  currentListItem.appendChild(todoDeleter);
  currentListItem.appendChild(todoCard);

  todoCard.appendChild(todoCardTitle);
  todoCard.appendChild(todoCardDesc);
  todoCard.appendChild(dateForm);
  
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


    // Remove add button.
    const addButton = document.querySelector("#proj-button");
    addButton.remove();

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

  addProjButton();


}


function createTodoForm(event) {

    const todoContainer = document.querySelector("#todo-container");

    const todoForm = document.createElement("form");
    todoForm.id = ("todo-form");

    // Title
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title-input");

    const title = document.createElement("input");
    title.id = "title-input";
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "New Todo");
    title.setAttribute("value", "");

    // Priority
    const greenPriorityLabel = document.createElement("label");
    greenPriorityLabel.setAttribute("for", "green");
    greenPriorityLabel.textContent = "Low";

    const greenPriority = document.createElement("input");
    greenPriority.setAttribute("type", "radio");
    greenPriority.checked = "checked";

    greenPriority.name = "priority_level";
    greenPriority.id = "green";
    greenPriority.value = "yellowgreen";

    const yellowPriorityLabel = document.createElement("label");
    yellowPriorityLabel.setAttribute("for", "yellow");
    yellowPriorityLabel.textContent = "Medium";

    const yellowPriority = document.createElement("input");
    yellowPriority.setAttribute("type", "radio");

    yellowPriority.name = "priority_level";
    yellowPriority.id = "yellow";
    yellowPriority.value = "#fcf22d ";

    const redPriorityLabel = document.createElement("label");
    redPriorityLabel.setAttribute("for", "red");
    redPriorityLabel.textContent = "High";

    const redPriority = document.createElement("input");
    redPriority.setAttribute("type", "radio");

    redPriority.name = "priority_level";
    redPriority.id = "red";
    redPriority.value = "Tomato";


    const todoInputSubmit = document.createElement("button");
    todoInputSubmit.textContent = "Create";
    todoInputSubmit.id = "todo-submit";

    todoForm.appendChild(titleLabel);
    todoForm.appendChild(title);

    todoForm.appendChild(greenPriority);
    todoForm.appendChild(greenPriorityLabel);
    todoForm.appendChild(yellowPriority);
    todoForm.appendChild(yellowPriorityLabel);
    todoForm.appendChild(redPriority);
    todoForm.appendChild(redPriorityLabel);

    todoForm.appendChild(todoInputSubmit);

    todoContainer.insertBefore(todoForm, todoContainer.children[1]);

    todoInputSubmit.addEventListener("click", todoSubmit);

    // Remove add button.
    const addButton = document.querySelector("#todo-button");
    addButton.remove();

}

function todoSubmit(event) {
  
  event.preventDefault();

  const title = document.querySelector("#title-input").value;
  const priority = document.querySelector('input[name = "priority_level"]:checked').value;
  const todoList = document.querySelector("#todo-list");

  const key = document.querySelector("#todo-header").textContent;
  const project = getFromStorage(key);

  let index = 0;

  if (todoList.hasChildNodes()) {

    index = todoList.children.length;   

    for (let i = 0; i < project.getLength(); i++) {
      if (project.getTodos()[i].getIndex() == index) {

      index = todoList.children.length + 1;
        
      }
    }
  }

  const newTodo = new Todo(title,"Hello Descript", "2012-02-02", priority, "false", index);

  project.addToItems(newTodo);
  populateTodoList(project);

  const todoForm = document.querySelector("#todo-form");
  todoForm.remove();

  addTodoButton();


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

