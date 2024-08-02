export class Todo {

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

