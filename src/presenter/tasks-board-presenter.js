import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ListEmptyComponent from "../view/list-empty-component.js"; 
import Header3Component from "../view/header3-component.js";
import { Status, StatusLabel } from "../const.js";
import { render, RenderPosition } from '../framework/render.js';
import DeleteButtonComponent from "../view/button-delete-component.js";
import { generateID } from '../utils.js';

export default class TaskBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = null;
    #boardTasks = [];
    #taskLists = {};
    
    
    get tasks() {
      return this.#tasksModel.tasks;
  }

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange);
        this.#tasksBoardComponent = new TaskBoardComponent();
        
        

    }
   

    init() {
        this.#boardTasks = [...this.tasks];
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderTasksList();
        
       
       
    }

    createTask(title) {
      const newTask = {
        id: generateID(),
        title,
        status: 'backlog',
      };
    
      this.#tasksModel.addTask(newTask);
    }

    #renderTasksList() {
        Object.values(Status).forEach((status) => {
          const statusTasks = this.#boardTasks.filter((task) => task.status === status);
    
          if (statusTasks.length === 0) {
            this.#renderListEmptyComponent(status);
            
            return;
          }
    
          const tasksListComponent = new TaskListComponent(status, StatusLabel[status]);
          this.#taskLists[status] = tasksListComponent;
    
          render(tasksListComponent, this.#tasksBoardComponent.element);
    
          statusTasks.forEach((task) => this.#renderTask(task, tasksListComponent));
    
          if (status === Status.BASKET) {
            this.#renderDeleteButton(tasksListComponent);
          }
        });
      }
    
     
    

      #renderTask(task, listComponent) {
        const taskComponent = new TaskComponent({ task });
        const listElement = listComponent.element.querySelector('.task-list');
        render(taskComponent, listElement);
      }
    
      #renderDeleteButton(listComponent) {
        const clearButtonComponent = new DeleteButtonComponent();
        const taskListElement = listComponent.element.querySelector('.task-list');
        render(clearButtonComponent, taskListElement, 'afterend');
      
        clearButtonComponent.element.addEventListener('click', () => {
          this.#tasksModel.deleteBasketTasks();
        });
      }

      #renderListEmptyComponent(status) {
        const emptyListComponent = new ListEmptyComponent(status, StatusLabel[status]);
        render(emptyListComponent, this.#tasksBoardComponent.element);
      }
      #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
        this.#taskLists = {};
      }
      #handleModelChange = () => {
        this.#clearBoard();
        this.init();
      }

    
    }
   