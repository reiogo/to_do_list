import {addToStorage, 
  getFromStorage,
  getTitleFromStorage,
  getContentFromStorage,
  getIndexFromStorage,
  getProjectsFromStorage
} from './storage';
import {Todo, unwrapAndMakeTodo} from './todo';

export class Project {

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
  
  getByIndex(index) {

    let todoItem = {};

    for(let i = 0; i < this.todoItemList.length; i++) {

      // console.log(this.todoItemList);
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

  const newProject = new Project(projTitle, [], i);
  addToStorage(newProject);

  
  return newProject;

}

