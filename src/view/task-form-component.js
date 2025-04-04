import { createElement } from '../framework/render.js';


function createTaskFormTemplate() {
  return `
      <div class="add-section">
          <header2>Новая задача</header2>
          <input type="text" id="new-task" placeholder="Название задачи...">
          <button id="add-task">+ Добавить</button>
      </div>
  `;
}


export default class TaskFormComponent {
  getTemplate() {
    return createTaskFormTemplate();
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
