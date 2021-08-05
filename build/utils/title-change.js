"use strict";
const title = document.querySelector('.title-input');
const pageTitle = document.querySelector('.page-title');
title.onchange = () => {
    if (title.value) {
        document.title = `Motion - ${title.value}`;
        pageTitle.innerText = title.value;
        pageTitle.setAttribute('title', title.value);
        pageTitle.classList.add('is-active');
    }
    else {
        document.title = `Motion`;
        pageTitle.innerText = 'Untitle';
        pageTitle.removeAttribute('title');
        pageTitle.classList.remove('is-active');
    }
};
title.onfocus = () => {
    title.classList.remove('is-active');
};
title.onblur = () => {
    if (title.value) {
        title.classList.add('is-active');
    }
};
title.onkeydown = (e) => {
    if (e.key === 'Enter') {
        title.blur();
    }
};
