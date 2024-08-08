import {Project, createNewProject} from './projects';
import {Todo} from './todo';
import {
  getProjectFromStorage,
  getContentFromStorage,
  getIndexFromStorage,
  getAllProjectsFromStorage
} from './storage';


export function setTodoList () {
  
  if (localStorage.length == 0) {
    const project = 0;
    populateTodoList(project);
    return;
  }
  const key = document.querySelector("#proj-list").firstChild.lastChild.id;
  populateTodoList(getProjectFromStorage(key));

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


  // Date
  const date = document.createElement("p");
  date.textContent = `Due: ${todoItem.getDate()}`;
  date.class = "date-on-card";
  date.id = `date-${todoItem.getIndex()}`;


  const todoCardPriority = document.createElement("p");
  todoCardPriority.textContent = item.priority;
  todoCardPriority.class = "todo-element";

  const todoCardComplete = document.createElement("p");
  todoCardComplete.textContent = item.complete;
  todoCardComplete.class = "todo-element";

  currentListItem.appendChild(todoDeleter);
  currentListItem.appendChild(todoCard);

  todoCard.appendChild(todoCardTitle);
  addDescription(todoItem, todoCard);
  todoCard.appendChild(date);
  
}

const projectGetter = function getCurrentProjectFromDom() {

  const projectName =
    document.querySelector("#todo-header").textContent;
  const project = getProjectFromStorage(projectName);

  return {projectName, project};

  
}



const setDesc = function addNewDescOnButtonClick(event) {

  const card = event.target.parentNode.parentNode;
  
  const {project} = projectGetter();
  const todoItem = project.getByIndex(card.id);

  const index = todoItem.getIndex();


  const newDesc = 
    document.querySelector(`#desc-input-${index}`).value;

  todoItem.setDesc(newDesc);
  project.removeItemByIndex(index);
  project.addToItems(todoItem);

  
  const desc = document.createElement("p");
  desc.textContent = newDesc;
  desc.id = `desc-${index}`;
  desc.class = "desc";

  card.insertBefore(desc, card.childNodes[2]);

  const textarea = document.querySelector(`#desc-input-${index}`);
  const addButton = document.querySelector(`#submit-button-${index}`);

  textarea.remove();
  addButton.remove();

}


const editDesc = function descEditButtonOnClick(event) {

  const card = event.target.parentNode;

  const {project} = projectGetter();
  const todoItem = project.getByIndex(card.id);
  const index = todoItem.getIndex();

  const form = document.createElement("form");
  form.id = `desc-form-${index}`;
  
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", `desc-input-${index}`);

  const desc = document.createElement("textarea");
  desc.id = `desc-input-${index}`;
  desc.value = `${todoItem.getDesc()}`;

  const submit = document.createElement("button");
  submit.id = `submit-button-${index}`;
  submit.textContent = "Add";

  form.appendChild(descLabel);
  form.appendChild(desc);
  form.appendChild(submit);

  
  card.childNodes[1].remove();
  card.insertBefore(form, card.childNodes[2]);

  event.target.remove();
  submit.addEventListener("click", setDesc);



  
}


const createEdit = function createEditButtonOnClick(event) {
  
  const card = event.target.parentNode;

  const {project} = projectGetter();
  const todoItem = project.getByIndex(card.id);
  const index = todoItem.getIndex();

  const editButton = document.createElement("button");
  editButton.id = `edit-button-${index}`;
  editButton.textContent = "Edit Description"
  
  const date = document.querySelector(`#date-${index}`);
  console.log(date);
  card.insertBefore(editButton, date);

  editButton.addEventListener("click", editDesc);


}


const addDescription = function descriptionOptions(todoItem, todoCard) {
  
  // const {projectName, project} = projectGetter();
  const todoIndex = todoItem.getIndex();

  if (todoItem.getDesc() == "") {

    const addDescButton = document.createElement("button");

    addDescButton.textContent = "Add Description";
    addDescButton.style = "font-size: .8rem;";

    todoCard.appendChild(addDescButton);
    addDescButton.addEventListener("click", addDesc);
    
  } else {
    //Display description
    const desc = document.createElement("p");
    desc.textContent = todoItem.getDesc()
    desc.id = `desc-${todoItem.getIndex()}`;
    desc.class = "desc";
    todoCard.appendChild(desc);
  }
}


const dateForm = function createDateFormOnClick(event) {
  
  //Get todoitem for its index.
  const todoItemTitle =
    event.target.parentNode.firstChild.textContent;
  const {projectName, project} = projectGetter();
  const todoItem = project.getTodoByTitle(todoItemTitle);
  const todoItemIndex = todoItem.getIndex();

  // Date form.
  const dateForm = document.createElement("form");
  dateForm.id = `date-form-${todoItemIndex}`;
  dateForm.style = "display: flex; flex-direction: column;";

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", `date-input-${todoItemIndex}`);

  const date = document.createElement("input");
  date.setAttribute("type", "date");
  const storedDate = todoItem.getDate();
  date.value = storedDate;
  date.name = "duedate";
  date.id = `date-input-${todoItemIndex}`;

  const dateSubmit = document.createElement("button");
  dateSubmit.class = "date-button";
  dateSubmit.textContent = "Set Date";


  dateForm.appendChild(dateLabel);
  dateForm.appendChild(date);
  dateForm.appendChild(dateSubmit);
  const currentListItem = event.target.parentNode;
  currentListItem.appendChild(dateForm);

  
  dateSubmit.addEventListener( "click", submitDate);

}

const submitDate = function dateEnteredOnTodoItem(event) {

  event.preventDefault();

  const todoItemTitle =
    event.target.parentNode.parentNode.firstChild.textContent;

  const projectName =
    document.querySelector("#todo-header").textContent;

  const project = getProjectFromStorage(projectName);
  
  const todoItem = project.getTodoByTitle(todoItemTitle);

  const todoItemIndex = todoItem.getIndex();

  project.removeItemByTitle(todoItemTitle);

  const dateInput =
    document.querySelector(`#date-input-${todoItemIndex}`);

  const date = dateInput.valueAsDate;

  todoItem.setDate(date);

  project.addToItems(todoItem);
  
  const oldDate =
    document.querySelector(`#date-${todoItem.getIndex()}`);
  oldDate.remove();

  const newDate = document.createElement("p");
  newDate.textContent = `Due: ${todoItem.getDate()}`;
  newDate.class = "date-on-card";
  newDate.id = `date-${todoItem.getIndex()}`;

  event.target.parentNode.parentNode.appendChild(newDate);

  const form = document.querySelector("#date-form");
  form.remove();

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

  populateProjects(getAllProjectsFromStorage());

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

  if (title == "") {
    return;
  }
  
  const priority = document.querySelector('input[name = "priority_level"]:checked').value;
  const todoList = document.querySelector("#todo-list");

  const key = document.querySelector("#todo-header").textContent;
  const project = getProjectFromStorage(key);

  let index = 0;

  if (todoList.hasChildNodes()) {

    index = todoList.children.length;   

    for (let i = 0; i < project.getLength(); i++) {
      if (project.getTodos()[i].getIndex() == index) {

      index = todoList.children.length + 1;
        
      }
    }
  }

  const date = new Date();

  const newTodo = new Todo(title,"", date, priority, "false", index);

  project.addToItems(newTodo);
  populateTodoList(project);

  const todoForm = document.querySelector("#todo-form");
  todoForm.remove();

  addTodoButton();


}

function deleteProject (event) {

  const key = event.target.value;
  localStorage.removeItemByIndex(key);

  event.target.parentNode.remove();
  setTodoList();
  
}

function deleteTodo (event) {

  const key =
    document.querySelector("#todo-header").textContent;
  const project = getProjectFromStorage(key);
  const index = event.target.value;

  project.removeItemByIndex(index);

  const todoListItem =event.target.parentNode;
  while (todoListItem.hasChildNodes()) {

    todoListItem.removeChild(todoListItem.firstChild);

  }

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
  const project = getProjectFromStorage(key);
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

    
  } 
  else if (event.target.class == "todo-element") {
    
    index = event.target.parentNode.id;
    item = project.getByIndex(index);
    listItem = event.target.parentNode.parentNode;


    while (listItem.hasChildNodes()) {

      listItem.removeChild(listItem.firstChild);

    }

    makeTodoItemTitle(item, listItem);
    
  }
  else if (event.target.class == "todo-deleter") {

    deleteTodo(event);
    
  } else if (event.target.class == "date-on-card") {

    dateForm(event);

  } else if (event.target.class == "desc") {
    
    createEdit(event);


  } else {

    return;

  }
}
