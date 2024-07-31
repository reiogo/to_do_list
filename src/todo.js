export default class Todo {

  constructor(title, description, duedate, priority, complete, todoIndex) {

    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.complete = complete;
    this.todoIndex = todoIndex

  }


  get() {

    const todoPackage = {title: this.title, description: this.description, duedate: this.duedate, priority: this.priority, complete: this.complete, todoIndex: this.todoIndex};
    
    return todoPackage;
    
  }


  getIndex() {

    return this.todoIndex;

  }


  getTitle() {
    
    return this.title;

  }
  
}

