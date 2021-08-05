import { BaseContents } from '../base-contents.js';
export class NoteComponent extends BaseContents {
    constructor(title, note) {
        super(`<section class="note">
            <h3 class="note-title"></h3>
            <p class="note-desc"></p>
          </section>`);
        const titleElement = this.element.querySelector('.note-title');
        titleElement.textContent = title;
        const descElement = this.element.querySelector('.note-desc');
        descElement.textContent = note;
    }
}
