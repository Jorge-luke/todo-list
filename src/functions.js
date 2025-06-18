export function deleteItem(container, item){
    container.removeChild(item);
}

export function switchFocus(element){
    element.focus();
}

export function getTitleToID(string){
    const array = string.trim().split(/\s+/);
    const stringJoined = array.join("-");
    const stringJoinedLower = stringJoined.toLowerCase();
    let fixed = stringJoinedLower.replace(/[^a-z0-9\-_]/g, '');
    if (!/^[a-z]/.test(fixed)){
        fixed = 'id-' + fixed;
    }
    return fixed;
}

export function dragItem(elementClass, container){
const list = container;
let draggingEl = null;

list.addEventListener("dragstart", (e) => {
  draggingEl = e.target;
  e.target.classList.add("dragging");
});

list.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  draggingEl = null;
});

list.addEventListener("dragover", (e) => {
  e.preventDefault(); // Necessary to allow dropping
  if (!draggingEl || !(draggingEl instanceof Node)) return;
  const afterElement = getDragAfterElement(list, e.clientY);
  if (afterElement == null) {
    list.appendChild(draggingEl);
  } else {
    list.insertBefore(draggingEl, afterElement);
  }

    // --- Auto-scroll logic ---
  const scrollMargin = 40; // px from top/bottom to start scrolling
  const scrollSpeed = 10; // px per dragover event

  const rect = list.getBoundingClientRect();
  if (e.clientY < rect.top + scrollMargin) {
    // Near top: scroll up
    list.scrollTop -= scrollSpeed;
  } else if (e.clientY > rect.bottom - scrollMargin) {
    // Near bottom: scroll down
    list.scrollTop += scrollSpeed;
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(`.${elementClass}:not(.dragging)`)
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}
}

export function dragCard(elementClass, container){
const list = container;
let draggingEl = null;

list.addEventListener("dragstart", (e) => {
  draggingEl = e.target;
  e.target.classList.add("dragging");
});

list.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  draggingEl = null;
});

list.addEventListener("dragover", (e) => {
  e.preventDefault(); // Necessary to allow dropping
  if (!draggingEl || !(draggingEl instanceof Node)) return;
  const afterElement = getDragAfterElement(list, e.clientY);
  if (afterElement == null) {
    list.appendChild(draggingEl);
  } else {
    list.insertBefore(draggingEl, afterElement);
  }

    // --- Auto-scroll logic ---
  const scrollMargin = 40; // px from top/bottom to start scrolling
  const scrollSpeed = 10; // px per dragover event

  const rect = list.getBoundingClientRect();
  if (e.clientY < rect.top + scrollMargin) {
    // Near top: scroll up
    list.scrollTop -= scrollSpeed;
  } else if (e.clientY > rect.bottom - scrollMargin) {
    // Near bottom: scroll down
    list.scrollTop += scrollSpeed;
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(`${elementClass}:not(.dragging)`)
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}
}