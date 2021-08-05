import { BaseContents } from './base-contents.js';
class ContentsItem extends BaseContents {
    constructor() {
        super(`<li>
      <article>
        <div>
          <header></header>
          <div class="card-body"></div>
        </div>
        <div>
          <button type="button">x</button>
        </div>
      </article>
    </li>`);
    }
    addChild(child) {
        const container = this.element.querySelector('.card-body');
        child.appendTo(container);
    }
}
export class ContentsList extends BaseContents {
    constructor() {
        super(`<ol class="contents-list"></ol>`);
    }
    addChild(section) {
        const newItem = new ContentsItem();
        newItem.addChild(section);
        newItem.appendTo(this.element, 'beforeend');
    }
}
