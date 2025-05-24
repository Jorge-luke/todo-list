export function project () {

function createTodo() {
    const todoCreation = document.createElement('div');
    
}

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

taskBottom.addEventListener("click", createTodo);


};