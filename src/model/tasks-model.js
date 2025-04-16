import { tasks } from '../mock/task.js';

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }
   

    addObserver(observer) {
        this.#observers.push(observer);
    }

    #notifyObservers() {
        for (const observer of this.#observers) {
            observer();
        }
    }

    addTask(task) {
        this.#boardtasks.push(task);
        this.#notifyObservers();
    }

    deleteBasketTasks() {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket');
        this.#notifyObservers();
    }
}