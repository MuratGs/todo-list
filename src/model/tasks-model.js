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
    moveTask(taskId, newStatus, beforeTaskId = null) {
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        const task = this.#boardtasks[taskIndex];
        if (!task) return;
      
        // Удаляем задачу с предыдущей позиции
        this.#boardtasks.splice(taskIndex, 1);
      
        // Обновляем статус
        task.status = newStatus;
      
        if (beforeTaskId) {
          const targetIndex = this.#boardtasks.findIndex(t => t.id === beforeTaskId);
          if (targetIndex !== -1) {
            this.#boardtasks.splice(targetIndex, 0, task);
          } else {
            this.#boardtasks.push(task); // если цель не найдена — в конец
          }
        } else {
          this.#boardtasks.push(task); // если перед кем не указано — в конец
        }
      
        this.#notifyObservers();
      }
      
}