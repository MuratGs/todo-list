import { createElement } from '../src/framework/render.js';

function createTaskComponentTemplate(taskName, taskType) {
  return (
    `<div class="${taskType}-item">${taskName}</div>`
  );
}

export default class TaskComponent {
  constructor(taskName, taskType) {
    this.taskName = taskName;
    this.taskType = taskType;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.taskName, this.taskType);
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
