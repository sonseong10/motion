import { BaseContents } from '../base-contents.js';
export class ImageComponent extends BaseContents {
    constructor(title, url) {
        super(`<figure class="image">
            <img draggable="false"/>
            <figcaption class="image-desc"></figcaption>
          </figure> `);
        const figcaptionElement = this.element.querySelector('.image-desc');
        figcaptionElement.innerText = title;
        const imgElement = this.element.querySelector('img');
        imgElement.src = url;
        imgElement.alt = '';
    }
}
