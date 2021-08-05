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
emojiList.onclick = (e) => {
    if (e == null) {
        throw new Error(`Unknow Error: ${e}`);
    }
    else {
        const target = e.target;
        if (target.dataset.id) {
            emojiButton.textContent = target.innerText;
        }
        emojiWrapper.classList.remove('is-open');
    }
};
