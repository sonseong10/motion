import { ContentsItem, ContentsList, } from './components/contents.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TitleComponent } from './components/item/title.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { ArrayInput } from './components/popup/list-input.js';
import { Popup, } from './components/popup/popup.js';
import { TextInput } from './components/popup/text-input.js';
import { URLInput } from './components/popup/url-input.js';
import './utils/emoji-picker.js';
class App {
    constructor(appRoot, popupRoot) {
        this.popupRoot = popupRoot;
        this.title = new TitleComponent();
        this.title.appendTo(appRoot, 'beforeend');
        this.contentsListItem = new ContentsList(ContentsItem);
        this.contentsListItem.appendTo(appRoot, 'beforeend');
        this.bindElToPopup('button[data-value="Image"]', URLInput, (input) => new ImageComponent(input.title, input.url));
        this.bindElToPopup('button[data-value="Video"]', URLInput, (input) => new VideoComponent(input.title, input.url));
        this.bindElToPopup('button[data-value="List"]', ArrayInput, (input) => new TodoComponent(input.title, input.item));
        this.bindElToPopup('button[data-value="Note"]', TextInput, (input) => new NoteComponent(input.title, input.desc));
    }
    bindElToPopup(selector, InputComponent, makeInput) {
        const toolBtn = document.querySelector(selector);
        toolBtn.addEventListener('click', () => {
            const popup = new Popup();
            const input = new InputComponent();
            popup.addChild(input);
            popup.appendTo(this.popupRoot);
            toolBtn.classList.add('is-active');
            popup.setCloseHandler(() => {
                popup.removeFrom(this.popupRoot);
                toolBtn.classList.remove('is-active');
            });
            popup.setSubmitHandler(() => {
                const element = makeInput(input);
                this.contentsListItem.addChild(element);
                popup.removeFrom(this.popupRoot);
                toolBtn.classList.remove('is-active');
            });
        });
    }
}
new App(document.querySelector('.contents-body'), document.body);
