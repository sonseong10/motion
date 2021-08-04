import { BaseContents } from '../base-contents.js'

export class ImageComponent extends BaseContents<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<figure class="image">
            <img />
            <figcaption class="image-desc"></figcaption>
          </figure> `)

    const figcaptionElement = this.element.querySelector(
      '.image-desc'
    )! as HTMLElement
    figcaptionElement.innerText = title

    const imgElement = this.element.querySelector('img')! as HTMLImageElement
    imgElement.src = url
    imgElement.alt = ''
  }
}
