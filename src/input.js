import { getTitleToID } from "./functions";

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

    const inputWrapper = document.createElement('div');
    inputWrapper.id = `${id}-input-wrapper`;
    inputWrapper.appendChild(labelElement);
    inputWrapper.appendChild(input);
    container.appendChild(inputWrapper);

    return input;
}

export function makeSelect(labelEl, id, container, name, labelClass, selectClass, ...value){
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add(`${labelClass}`);
    label.textContent = `${labelEl}`
    const selectWrapper = document.createElement('div');
    selectWrapper.id = `${id}-wrapper`;
    selectWrapper.appendChild(label);

    const select = document.createElement('select');
    select.id = id;
    select.setAttribute('name', name);
    select.classList.add(`${selectClass}`);


    value.forEach((element) => {
        const option = document.createElement('option');
        option.setAttribute('value', element);
        option.textContent = `${element}`;
        select.appendChild(option);
    })

    selectWrapper.appendChild(select);
    container.appendChild(selectWrapper);
    return select;
}

