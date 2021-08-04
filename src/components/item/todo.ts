import { BaseContents } from '../base-contents.js'

export class TodoComponent extends BaseContents<HTMLElement> {
  constructor(title: string, todo: Array<string>) {
    super(`<section class="todo">
            <h3></h3>
            <ol class="todo-list">
            </ol>
          </section>`)

    const titleElement = this.element.querySelector('h3')! as HTMLHeadingElement
    titleElement.textContent = title

    const todoList = this.element.querySelector(
      '.todo-list'
    )! as HTMLOListElement

    let count: number = 0
    todo.map((item) => {
      const todoItem = document.createElement('li')
      todoItem.setAttribute('class', 'todo-list-item')
      todoItem.innerHTML = `
      <label class="todo-label" for=${count}>${item}</label>
      <input id=${count} class="todo-text" type="checkbox" />`

      todoList.insertAdjacentElement('beforeend', todoItem)
      count++
    })

    todoList.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!target.matches('.todo-label')) {
        return
      }
      target.classList.toggle('is-active')
    })
  }
}
