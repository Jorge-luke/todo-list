export function project () {

function createInput(labelText, type, name, placeholder){
    const wrapper = document.createElement('div');

    const label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', name);
    
    const input = document.createElement('input');
    input.type = type;
    input.name = name;

    if (placeholder != undefined){
    input.setAttribute("placeholder", placeholder);
    };

    wrapper.appendChild(label);
    wrapper.appendChild(input);


    return wrapper;
   }

function createTask() {
    if (isCreating == false){
        
    const taskCreation = document.createElement('div');
    taskCreation.classList.add('task-creation');
    elementBox.appendChild(taskCreation);
    isCreating = true;



    const checklistInput = createInput("checklist?",'text',"checklist", "undfdsfds");
    taskCreation.appendChild(checklistInput);
    };
};

//Project

const projectItem = document.createElement('div');
projectItem.id = 'project'

const content = document.querySelector('#content');
content.appendChild(projectItem);

//create buttom to create todo card
//for each card
    //text-content
    //add due date
    //add check-box
    //add delete btn
    //add edit btn

const taskBox = document.createElement('div');
taskBox.id = 'task-box';
projectItem.appendChild(taskBox);

const taskTop = document.createElement('div');
taskTop.id = 'task-top';
taskTop.textContent = "New Item"
taskBox.appendChild(taskTop);


const taskBottom = document.createElement('button');
taskBottom.id = 'task-bottom';
taskBottom.textContent = "+";
taskBox.appendChild(taskBottom);

const elementBox = document.createElement('div');
elementBox.id = 'element-box';
projectItem.appendChild(elementBox);

let isCreating = false;
taskBottom.addEventListener("click", createTask);

};