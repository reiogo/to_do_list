import {Todo, unwrapAndMakeTodo} from './todo';
import {Project} from './projects';


export function addToStorage(project) {

  const storageKey = project.getTitle();
  const storageValue = 
    JSON.stringify({content: JSON.stringify(project.getTodos()), index: project.getIndex()});

  localStorage.setItem(storageKey, storageValue);

}

export function getProjectFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  const items = JSON.parse(storageContent.content);

  
  const todoItems = unwrapAndMakeTodo(items);

  const project = new Project(key, todoItems, JSON.parse(storageContent.index));
  return project;
  
}

export function getTitleFromStorage(project) {

  const projObject = JSON.parse(localStorage.getItem(project.getTitle()));

  console.log("fix this?");
  return projObject.title;

}

export function getContentFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  const items = JSON.parse(storageContent.content);
  
  const todoItems = unwrapAndMakeTodo(items);

  return todoItems;
  
}

export function getIndexFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  return storageContent.index;
  
}


export function getAllProjectsFromStorage () {
  
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


