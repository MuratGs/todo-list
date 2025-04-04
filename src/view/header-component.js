import { createElement } from '../framework/render.js';


function createHeaderComponentTemplate() {
  return (
    ` <header class="board-app__header">
          <div class="board-app__inner">
            <header1>Список задач</header1>
          </div>
        </header>
    `
  );
}


export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
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
