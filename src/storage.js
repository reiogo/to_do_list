// FIX THE GET STORAGE FUNCTION
//
import {Project, createNewProject} from './projects';

export function addToStorage(project) {

  const storageKey = project.getTitle();
  const storageValue = 
    JSON.stringify({content: JSON.stringify(project.get()), index: project.getIndex()});

  localStorage.setItem(storageKey, storageValue);

}

export function getFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  const project = new Project(key, JSON.parse(storageContent.content), JSON.parse(storageContent.index));
  return project;
  
}

export function getTitleFromStorage(project) {

  const projObject = JSON.parse(localStorage.getItem(project.getTitle()));

  // console.log( project );
  // console.log(localStorage.getItem(project.getTitle()));
  // console.log( projObject );

}

export function getContentFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  return storageContent.index;
  
}

export function getIndexFromStorage(key) {
  
  const storageContent = JSON.parse(localStorage.getItem(key));
  return storageContent.index;
  
}


// Returns false if nothing is there, returns all projects from localStorage otherwise.
// Projects need to be stored in 0-n order for the iterator to work.
export function storageOnStartup() {

  let returnArray = []

  if (localStorage.length == 0) {
    console.log('hello');
    return false
  } else {

    for (let i = 0; i< localStorage.length; i++) {
      returnArray.push(
        JSON.parse(localStorage.getItem(i))
      );
  }
    return returnArray;

  }
}



 
