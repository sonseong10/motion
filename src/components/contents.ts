import { BaseContents, Contents } from './base-contents.js'

export interface Contentsable {
  addChild(child: Contents): void
}

type RemoveHandle = () => void

interface SectionContainer extends Contents, Contentsable {
  removeHandler(index: RemoveHandle): void
}

type ContainerContents = {
  new (): SectionContainer
}

export class ContentsItem
  extends BaseContents<HTMLElement>
  implements SectionContainer
{
  private removeIndex?: RemoveHandle
  constructor() {
    super(`<li class="contents-list-item">
      <article class="card">
        <h2 class="visually-hidden">contents card</h2>
        <div class="card-left">
          <div class="card-body"></div>
        </div>
        <div class="card-right">
          <button class="remove-button" type="button" aria-label="remove this card">x</button>
        </div>
      </article>
    </li>`)
    const removeBtn = this.element.querySelector(
      '.remove-button'
    )! as HTMLButtonElement
    removeBtn.onclick = () => {
      this.removeIndex && this.removeIndex()
    }
  }

  addChild(child: Contents) {
    const container = this.element.querySelector('.card-body')! as HTMLElement
    child.appendTo(container)
  }

  removeHandler(index: RemoveHandle) {
    this.removeIndex = index
  }
}

export class ContentsList
  extends BaseContents<HTMLOListElement>
  implements Contentsable
{
  constructor(private itemContents: ContainerContents) {
    super(`<ol class="contents-list"></ol>`)
  }

  addChild(section: Contents) {
    const newItem = new this.itemContents()
    newItem.addChild(section)
    newItem.appendTo(this.element, 'beforeend')
    newItem.removeHandler(() => {
      newItem.removeFrom(this.element)
    })
  }
}
