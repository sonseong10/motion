import { BaseContents } from '../base-contents.js';
export class URLInput extends BaseContents {
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
          </div>`);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get url() {
        const element = this.element.querySelector('#url');
        if (!element.value) {
            alert('URL Empty! 🤔');
            throw new Error('URL Empty');
        }
        return element.value;
    }
}
