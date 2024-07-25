import Todo from './todo';
import Projects from './projects';
import {addToStorage, getFromStorage, storageOnStartup} from './storage';
import {
  startUp, 
  populateProjects, 
  populateTodoList} from './dom';

  startUp();


  if (localStorage.length == 0) {

    const defaultTodo = new Todo("Example Todo Item", "Example Description", "14-06-21", "red", "false");
    const defaultProj = new Projects("Default Project",[defaultTodo]);

    populateProjects([defaultProj]);
    populateTodoList([defaultTodo]);

  }
  





