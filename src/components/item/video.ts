import { BaseContents } from '../base-contents.js'

export class VideoComponent extends BaseContents<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<div class="iframe">
              <div>
                <iframe class="iframe-video" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>`)

    const iframeElement = this.element //
      .querySelector('.iframe-video')! as HTMLIFrameElement
    iframeElement.src = this.convertToEmbeddedURL(url)
    iframeElement.title = title
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/
    const match = url.match(regExp)
    const videoId = match ? match[1] || match[2] : undefined
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }
}

// reg type1
// ^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?$

// reg type2
// ^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))
