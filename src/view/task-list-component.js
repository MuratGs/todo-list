
import { AbstractComponent } from '../framework/view/abstract-component.js';
function createTaskListComponentTemplate(status, label) {
    return `
        <div class="task-section ${status}">
            <h3>${label}</h3>
            <ul class="task-list"></ul>
        </div>
    `;
}

export default class TaskListComponent extends AbstractComponent {
    constructor(status, label) {
        super();
        this.status = status;
        this.label = label;
    }

    get template() {
        return createTaskListComponentTemplate(this.status, this.label);
    }
}