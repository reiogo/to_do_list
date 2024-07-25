export default class Projects {

  constructor(title, todoItemList) {
    this.title = title
    this.todoItemList = todoItemList;
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
  
}

