export function makeInput(label, type, id, name, placeholder, container, inputClass, labelClass){
    const input = document.createElement('input');
    input.classList.add(inputClass);
    input.name = name;
    input.id = id;
    input.type = type;
    input.placeholder = placeholder;

    const labelElement = document.createElement('label');
    if(labelClass){
    labelElement.classList.add(labelClass);
    }
    labelElement.textContent = label;
    labelElement.setAttribute('for', id);
    container.appendChild(labelElement);
    container.appendChild(input);
    return input;
}