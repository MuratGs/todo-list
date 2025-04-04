import { createElement } from '../framework/render.js';


function createHeader3ComponentTemplate(text) {
    return (
        `<h3>${text}</h3>`
    );
}


export default class Header3Component {
    constructor(text) {
        this.text = text;
    }

    getTemplate() {
        return createHeader3ComponentTemplate(this.text);
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
