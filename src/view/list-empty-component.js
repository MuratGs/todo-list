import { AbstractComponent } from '../framework/view/abstract-component.js';


const createListEmptyComponent = (status) => {
    return `
        <li class="task-list-empty">
        Пустой Список 
        </li> `;
};

export default class ListEmptyComponent extends AbstractComponent {
    #status = null;

    constructor(status) {
        super();
        this.#status = status;
    }

    get template() {
        return createListEmptyComponent(this.#status);
    }
}