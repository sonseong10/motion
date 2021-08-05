import { BaseContents } from '../base-contents.js';
export class Popup extends BaseContents {
    constructor() {
        super(`<div>
        <div class="overlay">
          <artice class="popup">
            <header class="popup-header">
              <h3 class="popup-title">Add Element</h3>
            </header>
            <div class="popup-body"></div>
            <footer class="popup-footer">
              <button class="btn-ghost btn-40 close-button"   type="button">Close</button>
              <button class="btn-primary btn-40 submit-button"  type="submit">Create</button>
            </footer>
          </artice>
        </div>
      </div>`);
        const overlayElement = this.element.querySelector('.overlay');
        overlayElement.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.matches('.overlay')) {
                return;
            }
            this.closeHandler && this.closeHandler();
        });
        const closeBtn = this.element.querySelector('.close-button');
        closeBtn.addEventListener('click', () => {
            this.closeHandler && this.closeHandler();
        });
        const submitBtn = this.element.querySelector('.submit-button');
        submitBtn.addEventListener('click', () => {
            this.submitHandler && this.submitHandler();
        });
    }
    setCloseHandler(handler) {
        this.closeHandler = handler;
    }
    setSubmitHandler(handler) {
        this.submitHandler = handler;
    }
    addChild(child) {
        const body = this.element.querySelector('.popup-body');
        child.appendTo(body);
    }
}
