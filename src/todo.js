export default class Todo {

  constructor(title, description, duedate, priority) {

    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;

  }

  get() {

    todoPackage = {this.title, this.description, this.duedate, this.priority};
    
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
  
}

