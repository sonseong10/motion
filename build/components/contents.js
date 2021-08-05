import { BaseContents } from './base-contents.js';
export class ContentsItem extends BaseContents {
    constructor() {
        super(`<li class="contents-list-item" draggable="true">
      <article class="card">
        <h2 class="visually-hidden">contents card</h2>
        <div class="card-left">
          <div class="card-body"></div>
        </div>
        <div class="card-right">
          <button class="remove-button" type="button" aria-label="remove this card">x</button>
        </div>
      </article>
    </li>`);
        const removeBtn = this.element.querySelector('.remove-button');
        removeBtn.onclick = () => {
            this.removeListener && this.removeListener();
        };
        this.element.addEventListener('dragstart', (_) => {
            this.onDragStart(_);
        });
        this.element.addEventListener('dragend', (_) => {
            this.onDragEnd(_);
        });
        this.element.addEventListener('dragenter', (_) => {
            this.onDragEnter(_);
        });
        this.element.addEventListener('dragleave', (_) => {
            this.onDragLeave(_);
        });
    }
    notifyDragObservers(state) {
        this.dragStartListener && this.dragStartListener(this, state);
    }
    onDragStart(_) {
        this.notifyDragObservers('start');
        this.element.classList.add('is-dreg');
    }
    onDragEnd(_) {
        this.notifyDragObservers('end');
        this.element.classList.remove('is-dreg');
    }
    onDragEnter(_) {
        this.notifyDragObservers('enter');
    }
    onDragLeave(_) {
        this.notifyDragObservers('leave');
    }
    addChild(child) {
        const container = this.element.querySelector('.card-body');
        child.appendTo(container);
    }
    setOnRemoveListener(listener) {
        this.removeListener = listener;
    }
    setOnDragStartListener(listener) {
        this.dragStartListener = listener;
    }
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
}
export class ContentsList extends BaseContents {
    constructor(itemContents) {
        super(`<ol class="contents-list"></ol>`);
        this.itemContents = itemContents;
        this.children = new Set();
        this.element.addEventListener('dragover', (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event) => {
            this.onDragDrop(event);
        });
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDragDrop(event) {
        event.preventDefault();
        if (!this.dropTarger) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarger) {
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarger.append(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
        }
    }
    addChild(section) {
        const newItem = new this.itemContents();
        newItem.addChild(section);
        newItem.appendTo(this.element, 'beforeend');
        newItem.setOnRemoveListener(() => {
            newItem.removeFrom(this.element);
            this.children.delete;
        });
        this.children.add(newItem);
        newItem.setOnDragStartListener((target, state) => {
            switch (state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    break;
                case 'end':
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    break;
                case 'enter':
                    this.dropTarger = target;
                    break;
                case 'leave':
                    this.dropTarger = undefined;
                    break;
                default:
                    throw new Error(`Unknow state: ${state}`);
            }
        });
    }
    updateSections(state) {
        this.children.forEach((section) => {
            section.muteChildren(state);
        });
    }
}
