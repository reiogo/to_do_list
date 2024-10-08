export class Todo {

  constructor(title, description, duedate, priority, complete, todoIndex) {

    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.complete = complete;
    this.todoIndex = todoIndex

  }


  setDate(newDate) {

    this.duedate = newDate;
    
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


  getColor() {

    return this.priority;
    
  }


  getDate() {
    
    return this.duedate;

  }


  getDesc() {
    return this.description;
  }


  setDesc(newDesc) {

    this.description = newDesc;
    
  }
  
  

}

// Takes an array of objects and returns array of todo items.
export function unwrapAndMakeTodo (todoItemList) {
  
  let array = [];

  for (let i = 0; i < todoItemList.length; i++) {

    let item = new Todo(todoItemList[i].title, 
                        todoItemList[i].description, 
                        todoItemList[i].duedate,
                        todoItemList[i].priority,      
                        todoItemList[i].complete,
                        todoItemList[i].todoIndex); 
    array.push(item)

  }

  return array;

}
