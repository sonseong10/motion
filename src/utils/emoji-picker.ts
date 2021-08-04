const emojiButton: HTMLButtonElement = document //
  .querySelector('.chose-button')! as HTMLButtonElement

const emojiList: HTMLUListElement = document //
  .querySelector('.emoji-list')! as HTMLUListElement

const emojiWrapper: HTMLDivElement = document //
  .querySelector('.emoji')! as HTMLDivElement

emojiButton.onclick = () => {
  emojiWrapper.classList.toggle('is-open')
}

emojiButton.onblur = () => {
  emojiWrapper.classList.remove('is-open')
}

emojiList.onclick = (event) => {
  if (event == null) {
    throw new Error(`Unknow Error: ${event}`)
  } else {
    const target = event.target as HTMLElement
    if (target.dataset.id) {
      emojiButton.textContent = target.innerText
    }
    emojiWrapper.classList.remove('is-open')
  }
}
