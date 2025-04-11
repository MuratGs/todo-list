import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ListEmptyComponent from "../view/list-empty-component.js"; 
import Header3Component from "../view/header3-component.js";
import { Status, StatusLabel } from "../const.js";
import { render, RenderPosition } from '../framework/render.js';
import DeleteButtonComponent from "../view/button-delete-component.js";

export default class TaskBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = null;
    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksBoardComponent = new TaskBoardComponent();
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer, RenderPosition.BEFOREEND);
        this.#renderAllTaskLists();
    }

    #renderAllTaskLists() {
        Object.values(Status).forEach(status => {
            if (status === 'basket') {
                this.#renderBasketList();
            } else {
                this.#renderTasksList(status);
            }
        });
    }

    #renderTasksList(status) {
        const tasksListComponent = new TaskListComponent(status);
        render(tasksListComponent, this.#tasksBoardComponent.element, RenderPosition.BEFOREEND);

        this.#renderListHeader(status, tasksListComponent.element);

        const tasks = this.#getTasksByStatus(status);
        if (tasks.length > 0) {
            this.#renderTasks(tasks, tasksListComponent.element);
        } else {
            this.#renderListEmptyComponent(tasksListComponent.element, status);
        }
    }


    #renderBasketList() {
        const status = 'basket';
        const tasksListComponent = new TaskListComponent(status);
        render(tasksListComponent, this.#tasksBoardComponent.element, RenderPosition.BEFOREEND);

        this.#renderListHeader(status, tasksListComponent.element);

        const tasks = this.#getTasksByStatus(status);
        if (tasks.length > 0) {
            this.#renderTasks(tasks, tasksListComponent.element);
            this.#renderDeleteButton(tasksListComponent.element);
        } else {
            this.#renderListEmptyComponent(tasksListComponent.element, status);
        }
    }

    #renderListHeader(status, container) {
        render(
            new Header3Component(StatusLabel[status]),
            container,
            RenderPosition.AFTERBEGIN
        );
    }

    #renderTasks(tasks, container) {
        const tasksListElement = container.querySelector('ul');
        tasks.forEach(task => {
            this.#renderTask(task, tasksListElement);
        });
    }

    #renderTask(task, container) {
        render(
            new TaskComponent(task.title),
            container,
            RenderPosition.BEFOREEND
        );
    }

    #renderListEmptyComponent(container, status) {
        render(
            new ListEmptyComponent(status),
            container.querySelector('ul'),
            RenderPosition.BEFOREEND
        );
    }

    #renderDeleteButton(container) {
        render(
            new DeleteButtonComponent(),
            container,
            RenderPosition.BEFOREEND
        );
    }

    #getTasksByStatus(status) {
        return this.#boardTasks.filter(task => task.status === status);
    }
}