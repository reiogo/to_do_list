export default class Todo {

  constructor(title, description, duedate, priority, complete) {

    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.complete = complete;

  }

  get() {

    const todoPackage = {title: this.title, description: this.description, duedate: this.duedate, priority: this.priority, complete: this.complete};
    
    return todoPackage;
    
  }

  setTitle(newInfo) {
    this.title = newInfo;
  }

  setDescription(newInfo) {
    this.description = newInfo;
  }

  setDueDate(newInfo) {
    this.duedate = newInfo;
  }

  setPriority(newInfo) {
    this.priority = newInfo;
  }

  setIsComplete(newInfo) {
    this.priority = newInfo;
  }
  
  
}

