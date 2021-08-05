import { BaseContents, Contents } from '../base-contents.js'
import { Contentsable } from '../contents.js'

type OnCloseHander = () => void
type OnSubmitHander = () => void

export interface URLData {
  readonly title: string
  readonly url: string
}

export interface TextData {
  readonly title: string
  readonly desc: string
}

export interface ArrayData {
  readonly title: string
  readonly item: Array<string>
}
export class Popup extends BaseContents<HTMLElement> implements Contentsable {
  closeHandler?: OnCloseHander
  submitHandler?: OnSubmitHander
  constructor() {
    super(
      `<div>
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
      </div>`
    )

    const overlayElement = this.element.querySelector(
      '.overlay'
    )! as HTMLDivElement

    overlayElement.addEventListener('click', (event) => {
      const target = event.target as Element
      if (!target.matches('.overlay')) {
        return
      }
      this.closeHandler && this.closeHandler()
    })

    const closeBtn = this.element.querySelector(
      '.close-button'
    )! as HTMLButtonElement

    closeBtn.addEventListener('click', () => {
      this.closeHandler && this.closeHandler()
    })

    const submitBtn = this.element.querySelector(
      '.submit-button'
    )! as HTMLButtonElement
    submitBtn.addEventListener('click', () => {
      this.submitHandler && this.submitHandler()
    })
  }

  setCloseHandler(handler: OnCloseHander) {
    this.closeHandler = handler
  }

  setSubmitHandler(handler: OnSubmitHander) {
    this.submitHandler = handler
  }

  addChild(child: Contents) {
    const body = this.element.querySelector('.popup-body')! as HTMLDivElement
    child.appendTo(body)
  }
}
