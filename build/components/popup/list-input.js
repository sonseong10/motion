import { BaseContents } from '../base-contents.js';
export class ArrayInput extends BaseContents {
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
          </div>`);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get item() {
        const element = this.element.querySelector('#item');
        const result = element.value.split(',');
        if (!element.value) {
            alert('List Empty! 🤔');
            throw new Error('List Empty');
        }
        return result;
    }
}
