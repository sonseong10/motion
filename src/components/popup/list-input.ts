import { BaseContents } from '../base-contents.js'

export class ArrayInput extends BaseContents<HTMLElement> {
  constructor() {
    super(`<div class="input-group">
            <div class="input-box">
              <label for="title">Title</label>
              <input type="text" id="title"/>
            </div>
            <div class="input-box">
              <label for="item">Item</label>
              <input type="text" id="item" placeholder="separated by ', '"></input>
            </div>
          </div>`)
  }

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement
    return element.value
  }

  get item(): Array<string> {
    const element = this.element.querySelector('#item')! as HTMLInputElement
    const result = element.value.split(',')
    return result
  }
}
