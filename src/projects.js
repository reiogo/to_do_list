import {addToStorage, 
  getFromStorage,
  getTitleFromStorage,
  getContentFromStorage,
  getIndexFromStorage} from './storage';
import Todo from './todo';

export class Project {

  constructor(title, todoItemList, index) {

    this.title = title;
    this.todoItemList = new Todo(todoItemList);
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
  
  getByIndex(index) {

    let todoItem = {};

    for(let i = 0; i < this.todoItemList.length; i++) {

      if(index == this.todoItemList[i].getIndex()) {

        todoItem = this.todoItemList[i];

      } 

    }

    return todoItem;

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

