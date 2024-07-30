import {addToStorage, getFromStorage} from './storage';

export class Projects {

  constructor(title, todoItemList, index) {

    this.title = title;
    this.todoItemList = todoItemList;
    this.index = index;

  }


  addToItems(todoItem) {

    this.todoItemList.push(todoItem);

  }
  

  get() {

    return this.todoItemList;
    
  }

  
  getTitle() {
    return this.title;
  }

  getLength() {

    return this.todoItemList.length;

  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }
  
  
}


export function createNewProject (projTitle, i) {

  if (projTitle == "") {

    return;

  }

  const newProject = new Projects(projTitle, [], i);
  addToStorage(newProject);

  const projArray = [];

  for (const [key, value] of Object.entries(localStorage)) {
    let objIndex = value[value.length - 1];
    
    let project = new Projects(key, value, objIndex);
    projArray.push (project);

  }

  // projArray.sort(function(a, b) {
  //   return a.index - b.index;
  // });
    console.log(projArray);
  
  return projArray;

}

