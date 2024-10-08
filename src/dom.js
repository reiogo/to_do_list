import {format} from 'date-fns'
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
  addTodoButton.textContent = "+";
  addTodoButton.style = "appearance: none; border: none; font-size: 2rem; align-self: end; background-color: antiquewhite";
  todoContainer.appendChild(addTodoButton);

  addTodoButton.addEventListener("click", createTodoForm);

}


export function addProjButton() {

  const projContainer = document.querySelector("#proj-container");

  const addProjButton = document.createElement("button");
  addProjButton.id = "proj-button";
  addProjButton.textContent = "+";
  addProjButton.style = "appearance: none; border: none; font-size: 2rem; align-self: end; background-color: antiquewhite";

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
    projListItem.style = "margin: 26px; display: flex; align-items: center; justify-content: center;";
    const projDeleter = document.createElement("button");
    projDeleter.style = "height: 1rem; margin: 4px;";
    projDeleter.class = "proj-deleter";
    
    const projButton = document.createElement("button");

    projButton.textContent =
      listOfProjects[i].getTitle();

    projButton.style =
      "justify-content: center; display: flex; border: none; font-size: 1.3rem; background-color: antiquewhite; overflow-wrap: break-word; inline-size: 250px;";
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

  
  let todoHeader = document.createElement("h2");
  const todoDiv = document.querySelector("#todo-div");
  const todoList = document.createElement("ul");
  todoList.id = "todo-list";

  if (project == 0) {
    
    todoHeader = document.createElement("h2");
    todoHeader.textContent = "To do list";
    todoHeader.style = "font-size: 1.7rem";
    todoDiv.appendChild(todoHeader);
    return;

  }
  
  todoHeader.style = "font-size: 1.7rem";
  todoHeader.textContent = `${project.getTitle()}`;
  todoHeader.id = "todo-header";
  let count = project.getLength();

  let i = 0;

  while (count > 0) {

    if(project.indexExists(i)) {

      const listItem = document.createElement("li");
      listItem.style = "margin: 26px; justify-content: center; list-style-type: none; display: flex; align-items: center;";

      makeTodoItemTitle(project.getTodoByIndex(i), listItem);

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
  todoDeleter.style = "appearance: none; height: 1rem; margin: 4px; border-radius: 50%; border: 1px solid gray;";
  todoDeleter.class = "todo-deleter";
  todoDeleter.value = index;
  const todoButton = document.createElement("button");

  todoButton.textContent = todoItem.getTitle();
  todoButton.id = index; 
  todoButton.class = "todo-item-title"; 
  todoButton.style =
    `border: none; font-size: 1.5rem; background-color: ${todoItem.getColor()}; overflow-wrap: break-word; inline-size: 250px;`;

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
  todoCard.style = "background-color: darkkhaki; box-shadow: 5px 5px 5px 12px bisque; margin: 18px; padding: 2px 15px;";

  const color = todoItem.getColor();

  const item = todoItem.get();

  const todoCardTitle = document.createElement("p");
  todoCardTitle.textContent = item.title;
  todoCardTitle.class = "todo-element";
  todoCardTitle.style = `background-color: ${color}; font-size: 1.8rem;`;


  // Date
  const date = document.createElement("p");
  let dateValue = todoItem.getDate();

  if (dateValue == null) {

    dateValue = new Date();
    
  }
  
  date.textContent =
    `Due: ${format(dateValue, 'E dd/MM/yyyy')}`;
  date.class = "date-on-card";
  date.id = `date-${todoItem.getIndex()}`;
  date.style = "font-size: 1.5rem; padding-left: 18px;";



  currentListItem.appendChild(todoDeleter);
  currentListItem.appendChild(todoCard);

  todoCard.appendChild(todoCardTitle);
  addDescription(todoItem, todoCard);
  todoCard.appendChild(date);
  
}


const contextGetter = function getCurrentTodoAndProjFromDom(card) {

  const projectName =
    document.querySelector("#todo-header").textContent;
  const project = getProjectFromStorage(projectName);

  const todoItem = project.getTodoByIndex(card.id);
  const todoIndex = todoItem.getIndex();

  return {todoIndex, todoItem, project};

}


const setDesc = function submitEditsToDescOnButtonClick(event) {

  const card = event.target.parentNode.parentNode;
  
  const {todoIndex, todoItem, project} = contextGetter(card);

  const newDesc = 
    document.querySelector(`#desc-input-${todoIndex}`).value;

  todoItem.setDesc(newDesc);
  project.removeItemByIndex(todoIndex);
  project.addToItems(todoItem);

  
  const desc = document.createElement("p");
  desc.textContent = newDesc;
  desc.id = `desc-${todoIndex}`;
  desc.class = "desc";
  desc.style = "inline-size: 250px; overflow-wrap: break-word; font-size: 1.5rem; padding-left: 18px;";

  const date = document.querySelector(`#date-${todoIndex}`);
  card.insertBefore(desc, date);

  const textarea = document.querySelector(`#desc-input-${todoIndex}`);
  const addButton = document.querySelector(`#submit-button-${todoIndex}`);

  textarea.remove();
  addButton.remove();

  if (newDesc == "") {

    addDescription(todoItem, card);
    
  }
  

}


const descForm = function createDescEditFormOnClick(event) {

  const card = event.target.parentNode;

  const {todoItem, todoIndex, project} = contextGetter(card);

  const form = document.createElement("form");
  form.id = `desc-form-${todoIndex}`;
  
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", `desc-input-${todoIndex}`);

  const desc = document.createElement("textarea");
  desc.id = `desc-input-${todoIndex}`;
  desc.value = `${todoItem.getDesc()}`;
  desc.placeholder = "description";

  const submit = document.createElement("button");
  submit.id = `submit-button-${todoIndex}`;
  submit.textContent = "Add";

  form.appendChild(descLabel);
  form.appendChild(desc);
  form.appendChild(submit);

  
  if (event.target.class == "already-exists") {
    
    const oldDesc = document.querySelector(`#desc-${todoIndex}`);
    oldDesc.remove();

  }

  const date = document.querySelector(`#date-${todoIndex}`);
  card.insertBefore(form, date);

  event.target.remove();
  submit.addEventListener("click", setDesc);

}


const createEdit = function createButtonForEditingOnClick(event) {
  
  const card = event.target.parentNode;
  const {project, todoItem, todoIndex} = contextGetter(card);

  const editButton = document.createElement("button");
  editButton.id = `edit-button-${todoIndex}`;
  editButton.class = "already-exists"
  editButton.textContent = "Edit Description"
  editButton.style = "margin-left: 18px;";
  
  const date = document.querySelector(`#date-${todoIndex}`);
  card.insertBefore(editButton, date);

  editButton.addEventListener("click", descForm);


}


const addDescription = function descriptionOptions(todoItem, todoCard) {

  const todoIndex = todoItem.getIndex();

  if (todoItem.getDesc() == "") {

    const addDescButton = document.createElement("button");

    addDescButton.textContent = "Add Description";
    addDescButton.style = "font-size: .8rem; margin-left: 18px;";
    addDescButton.class = "new-desc";

    const date = document.querySelector(`#date-${todoIndex}`);
    todoCard.insertBefore(addDescButton, date);

    addDescButton.addEventListener("click", descForm);
    
  } else {

    const desc = document.createElement("p");
    desc.textContent = todoItem.getDesc()
    desc.id = `desc-${todoItem.getIndex()}`;
    desc.style = "font-size: 1.5rem; padding-left: 18px";
    desc.class = "desc";

    todoCard.appendChild(desc);

  }
}


const dateForm = function createDateFormOnClick(event) {
  
  const card = event.target.parentNode;
  const {todoItem, todoIndex, project} = contextGetter(card);

  // Date form.
  const dateForm = document.createElement("form");
  dateForm.id = `date-form-${todoIndex}`;
  dateForm.style = "display: flex; flex-direction: column;";

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", `date-input-${todoIndex}`);

  const date = document.createElement("input");
  date.setAttribute("type", "date");
  const storedDate = todoItem.getDate();
  date.value = storedDate;
  date.name = "duedate";
  date.id = `date-input-${todoIndex}`;

  const dateSubmit = document.createElement("button");
  dateSubmit.class = "date-button";
  dateSubmit.id = `date-button-${todoIndex}`;
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

  const card = event.target.parentNode.parentNode;
  const {todoItem, todoIndex, project} = contextGetter(card);

  project.removeItemByIndex(todoIndex);

  const dateInput =
    document.querySelector(`#date-input-${todoIndex}`);

  let date = dateInput.valueAsDate;
  if (date == null) {

    date = new Date();
    
  }

  todoItem.setDate(date);

  project.addToItems(todoItem);
  
  const oldDate =
    document.querySelector(`#date-${todoIndex}`);
  oldDate.remove();

  const formattedDate = format(date, 'E dd/MM/yyyy');

  const newDate = document.createElement("p");
  newDate.textContent = `Due: ${formattedDate}`;
  newDate.class = "date-on-card";
  newDate.id = `date-${todoIndex}`;

  card.appendChild(newDate);

  const form = document.querySelector(`#date-form-${todoIndex}`);
  form.remove();

}


function createProjForm(event) {

    const projContainer = document.querySelector("#proj-container");

    const projForm = document.createElement("form");
    projForm.style = "display: flex; flex-direction: column;";
    projForm.id = ("proj-form");

    const projInputLabel = document.createElement("label");
    projInputLabel.setAttribute("for", "proj-input");

    const projInput = document.createElement("input");
    projInput.id = "proj-input";
    projInput.setAttribute("type", "text");
    projInput.setAttribute("placeholder", "New Project");
    projInput.setAttribute("value", "");

    const projInputSubmit = document.createElement("button");
    projInputSubmit.style = "align-self: end;";
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
  const projInput = document.querySelector("#proj-input").value;
  const projList = document.querySelector("#proj-list");
  const projForm = document.querySelector("#proj-form");

  if(projInput == "") {

    addProjButton();
    projForm.remove();
    return;
    
  }
  

  let index = 0;
  const storageProjects = getAllProjectsFromStorage();

  if (projList.hasChildNodes()) {

    index = projList.children.length;   

    for (let i = 0; i < storageProjects.length; i++) {

      if (storageProjects[i].getIndex() == index) {

        index += 1;
        
      }
    }
  }

  const newProj = createNewProject(projInput, index);

  populateProjects(getAllProjectsFromStorage());

  projForm.remove();

  addProjButton();

  populateTodoList(newProj);


}


function createTodoForm(event) {

    const todoContainer = document.querySelector("#todo-container");

    const todoForm = document.createElement("form");
    todoForm.id = ("todo-form");
    todoForm.style = "display: grid; grid-template: 1fr/ 1fr 3fr";

    // Title
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title-input");

    const title = document.createElement("input");
    title.id = "title-input";
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "New Todo");
    title.setAttribute("value", "");
    title.style = "grid-column: 1/3;";

    // Priority
    const greenPriorityLabel = document.createElement("label");
    greenPriorityLabel.setAttribute("for", "green");
    greenPriorityLabel.textContent = "Low priority";
    greenPriorityLabel.style = "font-size: 1.5rem;";

    const greenPriority = document.createElement("input");
    greenPriority.setAttribute("type", "radio");
    greenPriority.checked = "checked";

    greenPriority.name = "priority_level";
    greenPriority.id = "green";
    greenPriority.value = "yellowgreen";
    greenPriority.style = "align-self: center; justify-self: end; margin-right: 10px;";

    const yellowPriorityLabel = document.createElement("label");
    yellowPriorityLabel.setAttribute("for", "yellow");
    yellowPriorityLabel.textContent = "Medium";
    yellowPriorityLabel.style = "font-size: 1.5rem;";

    const yellowPriority = document.createElement("input");
    yellowPriority.setAttribute("type", "radio");

    yellowPriority.name = "priority_level";
    yellowPriority.id = "yellow";
    yellowPriority.value = "#fcf22d ";
    yellowPriority.style = "align-self: center; justify-self: end; margin-right: 10px;";

    const redPriorityLabel = document.createElement("label");
    redPriorityLabel.setAttribute("for", "red");
    redPriorityLabel.textContent = "High";
    redPriorityLabel.style = "font-size: 1.5rem;";

    const redPriority = document.createElement("input");
    redPriority.setAttribute("type", "radio");

    redPriority.name = "priority_level";
    redPriority.id = "red";
    redPriority.value = "Tomato";
    redPriority.style = "align-self: center; justify-self: end; margin-right: 10px;";


    const todoInputSubmit = document.createElement("button");
    todoInputSubmit.textContent = "Create";
    todoInputSubmit.id = "todo-submit";
    todoInputSubmit.style = "grid-column: 2/3; justify-self: end;";

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

  const todoForm = document.querySelector("#todo-form");

  if (title == "") {
    todoForm.remove();
    addTodoButton();
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
  let item = project.getTodoByIndex(index);
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
    item = project.getTodoByIndex(index);
    listItem = event.target.parentNode.parentNode;


    while (listItem.hasChildNodes()) {

      listItem.removeChild(listItem.firstChild);

    }

    makeTodoItemTitle(item, listItem);
    
  }
  else if (event.target.class == "todo-deleter") {

    deleteTodo(event);
    
  } else if (
    event.target.class == "date-on-card" && 
    document.querySelector(`#date-button-${event.target.parentNode.id}`) == null
  ) {

    dateForm(event);

  } else if (
    event.target.class == "desc" &&
    document.querySelector(`#edit-button-${event.target.parentNode.id}`) == null
  ) {
    
    createEdit(event);


  } else {

    return;

  }
}
