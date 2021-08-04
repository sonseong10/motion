import { BaseContents } from '../base-contents.js'

export class TextInput extends BaseContents<HTMLElement> {
  constructor() {
    super(`<div class="input-group">
            <div class="input-box">
              <label for="title">Title</label>
              <input type="text" id="title"/>
            </div>
            <div class="input-box">
              <label for="desc">Desc</label>
              <textarea rows="5" cols="3" id="desc"></textarea>
            </div>
          </div>`)
  }

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement
    return element.value
  }

  get desc(): string {
    const element = this.element.querySelector('#desc')! as HTMLInputElement
    if (!element.value) {
      alert('Text Empty! 🤔')
      throw new Error('Text Empty')
    }
    return element.value
  }
}
