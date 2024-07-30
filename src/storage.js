// FIX THE GET STORAGE FUNCTION
//
export function addToStorage(project) {

  const storageKey = project.getTitle();
  const storageValue = 
    JSON.stringify({content: JSON.stringify(project.get()), index: project.getIndex()});

  localStorage.setItem(storageKey, storageValue);

}

export function getFromStorage(project) {

  return JSON.parse(localStorage.getItem(project))
  
}

export function getTitleFromStorage(project) {

  console.log(localStorage.getItem(project.getTitle()));
  const projObject = JSON.parse(localStorage.getItem(project.getTitle()));

  console.log( projObject );

  
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



 
