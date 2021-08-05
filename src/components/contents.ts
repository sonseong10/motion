import { BaseContents, Contents } from './base-contents.js'

export interface Contentsable {
  addChild(child: Contents): void
}

type onRemoveListener = () => void

type DragState = 'start' | 'end' | 'enter' | 'leave'

type onDragStateListener<T extends Contents> = (
  target: T,
  state: DragState
) => void

interface SectionContainer extends Contents, Contentsable {
  setOnRemoveListener(listener: onRemoveListener): void
  setOnDragStartListener(listener: onDragStateListener<SectionContainer>): void
  muteChildren(state: 'mute' | 'unmute'): void
  getBoundingRect(): DOMRect
}

type ContainerContents = {
  new (): SectionContainer
}

export class ContentsItem
  extends BaseContents<HTMLElement>
  implements SectionContainer
{
  private removeListener?: onRemoveListener
  private dragStartListener?: onDragStateListener<ContentsItem>
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
    </li>`)
    const removeBtn = this.element.querySelector(
      '.remove-button'
    )! as HTMLButtonElement
    removeBtn.onclick = () => {
      this.removeListener && this.removeListener()
    }
    this.element.addEventListener('dragstart', (_: DragEvent) => {
      this.onDragStart(_)
    })
    this.element.addEventListener('dragend', (_: DragEvent) => {
      this.onDragEnd(_)
    })
    this.element.addEventListener('dragenter', (_: DragEvent) => {
      this.onDragEnter(_)
    })
    this.element.addEventListener('dragleave', (_: DragEvent) => {
      this.onDragLeave(_)
    })
  }

  notifyDragObservers(state: DragState) {
    this.dragStartListener && this.dragStartListener(this, state)
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start')
    this.element.classList.add('is-dreg')
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('end')
    this.element.classList.remove('is-dreg')
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter')
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave')
  }

  addChild(child: Contents) {
    const container = this.element.querySelector('.card-body')! as HTMLElement
    child.appendTo(container)
  }

  setOnRemoveListener(listener: onRemoveListener) {
    this.removeListener = listener
  }

  setOnDragStartListener(listener: onDragStateListener<ContentsItem>) {
    this.dragStartListener = listener
  }

  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children')
    } else {
      this.element.classList.remove('mute-children')
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect()
  }
}

export class ContentsList
  extends BaseContents<HTMLOListElement>
  implements Contentsable
{
  private children = new Set<SectionContainer>()
  private dropTarger?: SectionContainer
  private dragTarget?: SectionContainer

  constructor(private itemContents: ContainerContents) {
    super(`<ol class="contents-list"></ol>`)

    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event)
    })
    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDragDrop(event)
    })
  }
  onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  onDragDrop(event: DragEvent) {
    event.preventDefault()
    if (!this.dropTarger) {
      return
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarger) {
      const dropY = event.clientY
      const srcElement = this.dragTarget.getBoundingRect()

      this.dragTarget.removeFrom(this.element)
      this.dropTarger.append(
        this.dragTarget,
        dropY < srcElement.y ? 'beforebegin' : 'afterend'
      )
    }
  }

  addChild(section: Contents) {
    const newItem = new this.itemContents()
    newItem.addChild(section)
    newItem.appendTo(this.element, 'beforeend')
    newItem.setOnRemoveListener(() => {
      newItem.removeFrom(this.element)
      this.children.delete
    })
    this.children.add(newItem)
    newItem.setOnDragStartListener(
      (target: SectionContainer, state: DragState) => {
        switch (state) {
          case 'start':
            this.dragTarget = target
            this.updateSections('mute')
            break
          case 'end':
            this.dragTarget = undefined
            this.updateSections('unmute')
            break
          case 'enter':
            this.dropTarger = target
            break
          case 'leave':
            this.dropTarger = undefined
            break
          default:
            throw new Error(`Unknow state: ${state}`)
        }
      }
    )
  }

  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state)
    })
  }
}
