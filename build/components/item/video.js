import { BaseContents } from '../base-contents.js';
export class VideoComponent extends BaseContents {
    constructor(title, url) {
        super(`<div class="iframe">
              <div>
                <iframe class="iframe-video" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>`);
        const iframeElement = this.element
            .querySelector('.iframe-video');
        iframeElement.src = this.convertToEmbeddedURL(url);
        iframeElement.title = title;
    }
    convertToEmbeddedURL(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        const videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}
