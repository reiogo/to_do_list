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
    this.hashSet = {};

    for(let i = 0; i < this.todoItemList.length; i++) {

      this.hashSet[`${this.todoItemList[i].getIndex()}`] =
        this.todoItemList[i];
    }
  }


  resetHashSet() {
    
    for(let i = 0; i < this.todoItemList.length; i++) {

      this.hashSet[`${this.todoItemList[i].getIndex()}`] =
        this.todoItemList[i];

    }
  }
  


  addToItems(todoItem) {

    this.todoItemList.push(todoItem);
    addToStorage(this);
    this.resetHashSet();

  }


  removeItem(todoIndex) {

    let newArray = [];

    for(let i = 0; i < this.todoItemList.length; i++) {

      if(todoIndex == this.todoItemList[i].getIndex()) continue;

      newArray.push(this.todoItemList[i]);

    }

    this.todoItemList = newArray;
    addToStorage(this);

    
  }
  

  getTodos() {

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


  indexExists(index) {

    if (index in this.hashSet) {

      return true;
      
    } else {
      
      return false;
      
    }
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

  const newProject = new Project(projTitle, [], i);
  addToStorage(newProject);

  
  return newProject;

}

