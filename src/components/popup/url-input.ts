import { BaseContents } from '../base-contents.js'
import { URLData } from './popup.js'

export class URLInput extends BaseContents<HTMLElement> implements URLData {
  constructor() {
    super(`<div class="input-group">
            <div class="input-box">
              <label for="title">Title</label>
              <input type="text" id="title"/>
            </div>
            <div class="input-box">
              <label for="url">URL</label>
              <input type="text" id="url"/>
            </div>
          </div>`)
  }

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement
    return element.value
  }

  get url(): string {
    const element = this.element.querySelector('#url')! as HTMLInputElement
    if (!element.value) {
      alert('URL Empty! 🤔')
      throw new Error('URL Empty')
    }
    return element.value
  }
}
