export class BaseContents {
    constructor(htmlElement) {
        const template = document.createElement('template');
        template.innerHTML = htmlElement;
        this.element = template.content.firstChild;
    }
    appendTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
    append(component, position) {
        component.appendTo(this.element, position);
    }
    removeFrom(parent) {
        if (parent !== this.element.parentElement) {
            throw new Error(`Unknow parent: ${parent}`);
        }
        parent.removeChild(this.element);
    }
}
