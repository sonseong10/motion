import { Contents } from './components/base-contents.js'
import {
  Contentsable,
  ContentsItem,
  ContentsList,
} from './components/contents.js'
import { ImageComponent } from './components/item/image.js'
import { NoteComponent } from './components/item/note.js'
import { TitleComponent } from './components/item/title.js'
import { TodoComponent } from './components/item/todo.js'
import { VideoComponent } from './components/item/video.js'
import { ArrayInput } from './components/popup/list-input.js'
import {
  ArrayData,
  Popup,
  TextData,
  URLData,
} from './components/popup/popup.js'
import { TextInput } from './components/popup/text-input.js'
import { URLInput } from './components/popup/url-input.js'
import './utils/emoji-picker.js'
// import './utils/drag-derop.js'

type InputComponentConstrutor<
  T extends (URLData | TextData | ArrayData) & Contents
> = {
  new (): T
}

class App {
  private readonly contentsListItem: Contents & Contentsable
  private readonly title: Contents & TitleComponent
  constructor(appRoot: HTMLElement, private popupRoot: HTMLElement) {
    this.title = new TitleComponent()
    this.title.appendTo(appRoot, 'beforeend')

    this.contentsListItem = new ContentsList(ContentsItem)
    this.contentsListItem.appendTo(appRoot, 'beforeend')

    this.bindElToPopup<URLInput>(
      'button[data-value="Image"]',
      URLInput,
      (input: URLInput) => new ImageComponent(input.title, input.url)
    )

    this.bindElToPopup<URLInput>(
      'button[data-value="Video"]',
      URLInput,
      (input: URLInput) => new VideoComponent(input.title, input.url)
    )

    this.bindElToPopup<ArrayInput>(
      'button[data-value="List"]',
      ArrayInput,
      (input: ArrayInput) => new TodoComponent(input.title, input.item)
    )

    this.bindElToPopup<TextInput>(
      'button[data-value="Note"]',
      TextInput,
      (input: TextInput) => new NoteComponent(input.title, input.desc)
    )
  }

  private bindElToPopup<T extends (URLData | TextData | ArrayData) & Contents>(
    selector: string,
    InputComponent: InputComponentConstrutor<T>,
    makeInput: (input: T) => Contents
  ) {
    const toolBtn = document.querySelector(selector) as HTMLButtonElement
    toolBtn.addEventListener('click', () => {
      const popup = new Popup()
      const input = new InputComponent()
      popup.addChild(input)
      popup.appendTo(this.popupRoot)
      toolBtn.classList.add('is-active')

      popup.setCloseHandler(() => {
        popup.removeFrom(this.popupRoot)
        toolBtn.classList.remove('is-active')
      })

      popup.setSubmitHandler(() => {
        const element = makeInput(input)
        this.contentsListItem.addChild(element)
        popup.removeFrom(this.popupRoot)
        toolBtn.classList.remove('is-active')
      })
    })
  }
}

new App(
  document.querySelector('.contents-body')! as HTMLDivElement,
  document.body
)
