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
import { Popup } from './components/popup/popup.js'
import { TextInput } from './components/popup/text-input.js'
import { URLInput } from './components/popup/url-input.js'
import './utils/emoji-picker.js'

class App {
  private readonly contentsListItem: Contents & Contentsable
  private readonly title: Contents & TitleComponent
  constructor(appRoot: HTMLElement, popupRoot: HTMLElement) {
    this.title = new TitleComponent()
    this.title.appendTo(appRoot, 'beforeend')

    this.contentsListItem = new ContentsList(ContentsItem)
    this.contentsListItem.appendTo(appRoot, 'beforeend')

    // const video = new VideoComponent('video', 'https://youtu.be/DbXMjAYSa68')
    // this.contentsListItem.addChild(video)

    // const note = new NoteComponent('TITLE', '오늘의 테스트 문장')
    // this.contentsListItem.addChild(note)

    // const todo = new TodoComponent('loremTitle', [
    //   'learn TS!!!',
    //   'dldldl',
    //   'test',
    // ])
    // this.contentsListItem.addChild(todo)

    const imgBtn = document.querySelector(
      'button[data-value="Image"]'
    ) as HTMLButtonElement
    imgBtn.addEventListener('click', () => {
      const popup = new Popup()
      const urlInput = new URLInput()
      popup.addChild(urlInput)
      popup.appendTo(popupRoot)
      imgBtn.classList.add('is-active')

      popup.setCloseHandler(() => {
        popup.removeFrom(popupRoot)
        imgBtn.classList.remove('is-active')
      })

      popup.setSubmitHandler(() => {
        const image = new ImageComponent(urlInput.title, urlInput.url)
        this.contentsListItem.addChild(image)
        popup.removeFrom(popupRoot)
        imgBtn.classList.remove('is-active')
      })
    })

    const videoBtn = document.querySelector(
      'button[data-value="Video"]'
    ) as HTMLButtonElement
    videoBtn.addEventListener('click', () => {
      const popup = new Popup()
      const urlInput = new URLInput()
      popup.addChild(urlInput)
      popup.appendTo(popupRoot)
      videoBtn.classList.add('is-active')

      popup.setCloseHandler(() => {
        popup.removeFrom(popupRoot)
        videoBtn.classList.remove('is-active')
      })

      popup.setSubmitHandler(() => {
        const video = new VideoComponent(urlInput.title, urlInput.url)
        this.contentsListItem.addChild(video)
        popup.removeFrom(popupRoot)
        videoBtn.classList.remove('is-active')
      })
    })

    const todoBtn = document.querySelector(
      'button[data-value="List"]'
    ) as HTMLButtonElement
    todoBtn.addEventListener('click', () => {
      const popup = new Popup()
      const arrayInput = new ArrayInput()
      popup.addChild(arrayInput)
      popup.appendTo(popupRoot)
      todoBtn.classList.add('is-active')

      popup.setCloseHandler(() => {
        popup.removeFrom(popupRoot)
        todoBtn.classList.remove('is-active')
      })

      popup.setSubmitHandler(() => {
        const todo = new TodoComponent(arrayInput.title, arrayInput.item)
        this.contentsListItem.addChild(todo)
        popup.removeFrom(popupRoot)
        todoBtn.classList.remove('is-active')
      })
    })

    const noteBtn = document.querySelector(
      'button[data-value="Note"]'
    ) as HTMLButtonElement
    noteBtn.addEventListener('click', () => {
      const popup = new Popup()
      const textInput = new TextInput()
      popup.addChild(textInput)
      popup.appendTo(popupRoot)
      noteBtn.classList.add('is-active')

      popup.setCloseHandler(() => {
        popup.removeFrom(popupRoot)
        noteBtn.classList.remove('is-active')
      })

      popup.setSubmitHandler(() => {
        const note = new NoteComponent(textInput.title, textInput.desc)
        this.contentsListItem.addChild(note)
        popup.removeFrom(popupRoot)
        noteBtn.classList.remove('is-active')
      })
    })
  }
}

new App(
  document.querySelector('.contents-body')! as HTMLDivElement,
  document.body
)
