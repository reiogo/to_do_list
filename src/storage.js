export function addToStorage (number, project) {

  localStorage.setItem(number, JSON.stringify(project))

}

export function getFromStorage(project) {

  console.log(JSON.parse(localStorage.getItem(project)));
  return JSON.parse(localStorage.getItem(project))
  
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



 
