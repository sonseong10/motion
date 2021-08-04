import { BaseContents } from '../base-contents.js'

export class NoteComponent extends BaseContents<HTMLElement> {
  constructor(title: string, note: string) {
    super(`<section class="note">
            <h3 class="note-title"></h3>
            <p class="note-desc"></p>
          </section>`)

    const titleElement = this.element.querySelector(
      '.note-title'
    )! as HTMLHeadingElement
    titleElement.textContent = title

    const descElement = this.element.querySelector(
      '.note-desc'
    )! as HTMLParagraphElement
    descElement.textContent = note
  }
}
