"use strict";
const parentElement = document.querySelector('.contents-list');
let targets = new Array();
function init() {
    for (let i = 0; i < parentElement.children.length; i++) {
        const targetElement = parentElement.children[i];
        if (targetElement.classList != null &&
            targetElement.classList.contains('draggable_item')) {
            targetElement.ondragstart = (ev) => handleStartDraggingEvent(ev);
            targetElement.ondragover = (ev) => handleDraggingOverEvent(ev);
            targetElement.ondragenter = (ev) => handleDraggingEnterEvent(ev);
            targetElement.ondragexit = (ev) => handleDraggingExitEvent(ev);
            targetElement.ondrop = (ev) => handleDroppingEvent(ev);
            targetElement.ondragend = (ev) => handleDropEndEvent(ev);
            targets.push({
                id: targetElement.id,
                element: targetElement,
                index: i,
            });
        }
    }
}
function handleStartDraggingEvent(ev) {
    const target = ev.target;
    console.log('[DRAG] ' + target.id);
    target.classList.add('dragging');
    var dataTransfer = ev.dataTransfer;
    if (dataTransfer == null) {
        console.error('dataTransfer was null');
        return;
    }
    dataTransfer.setData('text/plain', target.id);
}
function handleDraggingEnterEvent(ev) {
    const target = ev.target;
    if (target.id === ev.dataTransfer.getData('text/plain')) {
        return;
    }
    if ((target === null || target === void 0 ? void 0 : target.classList) == null) {
        console.log(target);
        return;
    }
    target.classList.add('drop_over');
}
function handleDraggingExitEvent(ev) {
    const target = ev.target;
    if ((target === null || target === void 0 ? void 0 : target.classList) == null) {
        return;
    }
    target.classList.remove('drop_over');
}
function handleDraggingOverEvent(ev) {
    ev.preventDefault();
}
function handleDropEndEvent(ev) {
    const target = ev.target;
    if ((target === null || target === void 0 ? void 0 : target.classList) == null) {
        return;
    }
    target.classList.remove('dragging');
    if (target.classList.contains('drop_over')) {
        target.classList.remove('drop_over');
    }
}
function handleDroppingEvent(ev) {
    const target = ev.target;
    if (target.classList.contains('drop_over')) {
        target.classList.remove('drop_over');
    }
    console.log('[DROP]' + target.id);
    const dragTargetId = ev.dataTransfer.getData('text/plain');
    const dropped = targets.find((t) => t.id === target.id);
    const dragged = targets.find((t) => t.id == dragTargetId);
    if (dropped == null || dragged == null) {
        return;
    }
    const droppedIndex = dropped.index;
    dropped.index = dragged.index;
    dragged.index = droppedIndex;
    ev.preventDefault();
}
init();
