"use strict";
const emojiButton = document
    .querySelector('.chose-button');
const emojiList = document
    .querySelector('.emoji-list');
const emojiWrapper = document
    .querySelector('.emoji');
emojiButton.onclick = () => {
    emojiWrapper.classList.toggle('is-open');
};
emojiButton.onblur = () => {
    emojiWrapper.classList.remove('is-open');
};
emojiList.onclick = (event) => {
    if (event == null) {
        throw new Error(`Unknow Error: ${event}`);
    }
    else {
        const target = event.target;
        if (target.dataset.id) {
            emojiButton.textContent = target.innerText;
        }
        emojiWrapper.classList.remove('is-open');
    }
};
