import Projects from './projects';
export function startUp(startUpProjects) {

  document.body.style = "display: grid; padding: 0; margin: 0; grid-template: 100vh/ 1fr 3fr; font-size: 28px;"

  const projContainer = document.createElement("div");
  projContainer.id = "proj-container";

  const todoContainer = document.createElement("div");
  todoContainer.id = "todo-container";

  document.body.appendChild(projContainer);
  document.body.appendChild(todoContainer);


  const projDiv = document.createElement("div");
  projDiv.id = "proj-div";
  projDiv.style = "padding-left: 35px;";

  const todoDiv = document.createElement("div");
  todoDiv.id = "todo-div";
  todoDiv.style = "padding-right: 35px;";


  projContainer.appendChild(projDiv);
  todoContainer.appendChild(todoDiv);

  const projHeader = document.createElement("h2");
  projHeader.textContent = "Projects"
  projDiv.appendChild(projHeader);



  addEvents();

}


export function populateProjects (projList) {

  const projDiv = document.querySelector("#proj-div");

  for (let i = 0; i < projList.length; i++) {

    const projButton = document.createElement("button")

    projButton.textContent =
      projList[i].getTitle();

    projButton.style =
      "border: none; font-size: 1.3rem;";
    projButton.class = "project-expand";

    const key = projList[i].getTitle();
    projButton.id = `${key}`;

    projDiv.appendChild(projButton);
    
  }
  
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

    makeTodoItemTitle(project.getTitle(), i, todoListItem);

    todoList.appendChild(todoListItem);
    
  }
  todoDiv.appendChild(todoHeader);
  todoDiv.appendChild(todoList);

}


function makeTodoItemTitle (key, index, currentListItem) {

  const todoButton = document.createElement("button");
  todoButton.textContent = JSON.parse(localStorage.getItem(key))[index].title;
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

  const item = JSON.parse(localStorage.getItem(key))[index];

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

function expandProject (event) {

  if (event.target.class == "project-expand") {
    const todoList = document.querySelector("#todo-div");
    const key = event.target.id
    const project = new Projects (`${key}`,
      JSON.parse(localStorage.getItem(key)));
    while (todoList.hasChildNodes()) {
      todoList.removeChild(todoList.firstChild);
    }

    populateTodoList(project);
  }
  
  
}
