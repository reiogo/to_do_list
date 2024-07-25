export function startUp() {

  document.body.style = "display: grid; padding: 0; margin: 0; grid-template: 100vh/ 1fr 3fr"


  const projDiv = document.createElement("div");
  projDiv.id = "proj-div";
  projDiv.style = "padding-left: 35px;";

  const todoDiv = document.createElement("div");
  todoDiv.id = "todo-div";
  todoDiv.style = "padding-right: 35px;";


  document.body.appendChild(projDiv);
  document.body.appendChild(todoDiv);

  
  const projHeader = document.createElement("h2");
  projHeader.textContent = "Projects";
  projDiv.appendChild(projHeader);


  const todoHeader = document.createElement("h2");
  todoHeader.textContent = "List title";
  todoDiv.appendChild(todoHeader);
}

export function populateProjects (projList) {

  const projDiv = document.querySelector("#proj-div");

  for (let i = 0; i < projList.length; i++) {

    const projContainer = document.createElement("button")
    projContainer.style = "border: none; font-size: 1.3rem;";
    projContainer.textContent =
      projList[i].getTitle();
    projContainer.class = "proj-container"
    projContainer.contentEditable = "true";
    projDiv.appendChild(projContainer);
    
  }
  
}


export function populateTodoList (project) {

  const listDiv = document.querySelector("#todo-div");
  const todoList = document.createElement("ul");

  for (let i = 0; i < project.length; i++) {

    const todoListItem = document.createElement("li");
    const todoButton = document.createElement("button");
    todoButton.textContent = project[i].get().title;
    todoButton.id = `${i}`; 
    todoButton.style = "border: none; font-size: 1.5rem";
    todoListItem.style = "list-style-type: none;";
    todoListItem.appendChild(todoButton);
    todoList.appendChild(todoListItem);
    
  }

  listDiv.appendChild(todoList);
  
  
}

addExpandFeature

