export interface Contents {
  appendTo(parent: HTMLElement, position?: InsertPosition): void
  append(component: Contents, position?: InsertPosition): void
  removeFrom(parent: HTMLElement): void
}

export class BaseContents<T extends HTMLElement> implements Contents {
  protected readonly element: T
  constructor(htmlElement: string) {
    const template = document.createElement('template')
    template.innerHTML = htmlElement
    this.element = template.content.firstChild! as T
  }

  appendTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element)
  }

  append(component: Contents, position?: InsertPosition) {
    component.appendTo(this.element, position)
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error(`Unknow parent: ${parent}`)
    }
    parent.removeChild(this.element)
  }
}
