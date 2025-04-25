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
        const statusTasks = this.#tasksModel.tasks.filter((task) => task.status === status);
       
        const tasksListComponent = new TaskListComponent({
          status,
          label: StatusLabel[status],
          onTaskDrop: this.#handleTaskDrop.bind(this),
        });
    
        this.#taskLists[status] = tasksListComponent;
        render(tasksListComponent, this.#tasksBoardComponent.element);
    
        if (statusTasks.length === 0) {
          const emptyMessage = document.createElement('li');
          emptyMessage.classList.add('task-empty');
          emptyMessage.textContent = 'Пустой список';
          const listElement = tasksListComponent.element.querySelector('.task-list');
          listElement.appendChild(emptyMessage);
        }
    
        statusTasks.forEach((task) => this.#renderTask(task, tasksListComponent));
    
        if (status === Status.BASKET) {
          this.#renderDeleteButton(tasksListComponent);
        }
      });
    }
    
    #handleTaskDrop(taskId, newStatus, targetTaskId = null) {
      this.#tasksModel.moveTask(taskId, newStatus, targetTaskId);
    }
     
    

    #renderTask(task, listComponent) {
      const taskComponent = new TaskComponent({
        task,
        onTaskDrop: this.#handleTaskDrop.bind(this),
      });
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