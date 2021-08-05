import { BaseContents } from '../base-contents.js';
export class TextInput extends BaseContents {
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
          </div>`);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get desc() {
        const element = this.element.querySelector('#desc');
        if (!element.value) {
            alert('Text Empty! 🤔');
            throw new Error('Text Empty');
        }
        return element.value;
    }
}
