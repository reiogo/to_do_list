import Todo from './todo';
import Projects from './projects';
import {addToStorage, getFromStorage, storageOnStartup} from './storage';
import {
  startUp, 
  populateProjects, 
  populateTodoList} from './dom';

    startUp();


  if (localStorage.length <=1) {

    const defaultTodo = new Todo("Example Todo Item", "Example Description", "14-06-21", "red", "false");
    const defaultTodo2 = new Todo("Example 2 Todo Item", "Example Description", "15-06-21", "red", "false");
    const defaultProj = new Projects("Default Project",[defaultTodo, defaultTodo2]);
    const defaultProj2 = new Projects("Default Project2",[defaultTodo, defaultTodo2]);

    populateProjects([defaultProj, defaultProj2]);
    populateTodoList(defaultProj);

    localStorage.setItem(defaultProj.getTitle(), JSON.stringify(defaultProj.get()));
    localStorage.setItem(defaultProj2.getTitle(), JSON.stringify(defaultProj2.get()));


  }
  





