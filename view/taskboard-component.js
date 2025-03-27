import { createElement } from '../src/framework/render.js';

function createTaskboardComponentTemplate() {
  return (
    `<section class="taskboard">
      <div class="task-list" id="backlog">
        <h2 class="backlog-title">Можно</h2>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <!-- Задачи из бэклога -->
      </div>
      <div class="task-list" id="progress">
        <h2 class="in-progress-title">Пересдать</h2>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
      </div>
      <div class="task-list" id="completed">
        <h2 class="completed-title">Первую</h2>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <!-- Готовые задачи -->
      </div>
      <div class="task-list" id="trash">
        <h2 class="trash-title">Лабу?))</h2>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <div class="task">Здесь блок </div>
        <!-- Задачи в корзине -->
      </div>
    </section>`
  );
}

export default class TaskboardComponent {
  getTemplate() {
    return createTaskboardComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
