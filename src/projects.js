export default class Projects {

  constructor(todoItemList) {
    this.todoItemList = todoItemList;
  }

  addToItems(todoItem) {
    this.todoItemList.push(todoItem);
  }
  
  get() {
    
  }
}

