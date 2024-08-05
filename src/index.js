import Todo from './todo';
import {Project, createNewProject} from './projects';
import {addToStorage, 
  getFromStorage,
  getTitleFromStorage,
  getContentFromStorage,
  getIndexFromStorage} from './storage';
import {
  startUp, 
  populateProjects, 
  populateTodoList} from './dom';

    startUp();

