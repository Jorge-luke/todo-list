import { Project } from "./project.js";
import { renderProject } from "./project.js";
import { addCreateCardBtn } from "./cards.js";
import { makeInput } from "./input.js";
export const projectState = { currentProject: ""};
import { getTitleToID, switchFocus } from "./functions.js";

export const projectsHandler = [];
window.projectsHandler = projectsHandler;


export function newProjectBtn (){
    const newProjectBtn = document.querySelector('#new-project-btn');

    newProjectBtn.addEventListener('click', () => {
        if(document.querySelector('#new-project-wrapper')){
            const newProjectWrapper = document.querySelector('#new-project-wrapper');
            newProjectWrapper.remove();
        } else {


    
    const container = document.createElement('div');
    container.id = "new-project-wrapper";
    document.querySelector('#nav-bottom').appendChild(container);

    const inputWrapper = document.createElement('div');
    inputWrapper.id = 'input-wrapper';
    container.appendChild(inputWrapper);
    

    const createNewProject = document.createElement('div');
    createNewProject.id = "new-project-wrapper";
    inputWrapper.appendChild(createNewProject);
    
    // export function makeInput(label, type, id, name, placeholder, container, inputClass, labelClass){

    const ProjectInputTitle = new makeInput("New Project: ", "text", "new-project-title", 
        "new-project-title", "project name", createNewProject, "new-project-input", "new-project-label");

    ProjectInputTitle.focus();

    const addProjectBtn = document.createElement('button');
    addProjectBtn.id = "add-new-project";
    container.appendChild(addProjectBtn);

    makeInput("Description: ", "text", "new-project-description", 
        "new-project-description", "description", inputWrapper, "new-project-input", "new-project-label");

    makeInput("Priority: ", "text", "new-project-priority", 
        "new-project-priority", "priority", inputWrapper, "new-project-input", "new-project-label");

    ProjectInputTitle.addEventListener("keydown", (event)=>{
        if (event.key == "Enter"){
            addProjectOnMenu();
        }
    })

    addProjectBtn.addEventListener("click", () => {

    const title = document.querySelector("#new-project-title").value;
    const id = getTitleToID(title);
    const description = document.querySelector("#new-project-description").value;
    const priority = document.querySelector("#new-project-priority").value;
    addProjectOnMenu(id, title, description, priority);
    switchFocus(ProjectInputTitle);
        })
    }
    });
}

export function addProjectOnMenu(id, title, description, priority) {
    // let projectInput = document.querySelector("#new-project-title");
    // const projectID = getTitleToID(projectInput.value);
    const projectID = id;
    // const projectTitle = projectInput.value; 
    const projectTitle = title;

    // const projectDescriptionInput = document.querySelector("#new-project-description");
    // const projectDescription = getTitleToID(projectDescriptionInput.value);

    const projectDescription = description;

    // const projectPriorityInput = document.querySelector("#new-project-priority");
    // const projectPriority = getTitleToID(projectPriorityInput.value);

    const projectPriority = priority;
    
    const projectBtn = document.createElement('button');
    // projectBtn.textContent = `${projectInput.value}`;
    projectBtn.textContent = projectTitle;
    projectBtn.classList.add('project-select');
    
    // projectBtn.id = `${projectInput.value}-project`;
    projectBtn.id = `${projectDescription}-btn`;
        
    const projectMenu = document.querySelector('#project-menu');

    const projectWrapper = document.createElement('div');
    projectWrapper.id = `${projectID}-btn-wrapper`;
    projectWrapper.classList.add('project-btn-wrapper');
    projectMenu.appendChild(projectWrapper);


    projectWrapper.appendChild(projectBtn);


    deleteProjectBtn(projectBtn, projectWrapper);

    projectBtn.addEventListener("click", () => {

        const project = new Project(projectID, projectTitle, projectDescription, projectPriority);
        if(!projectsHandler.includes(project)){
        projectsHandler.push(project);
        renderProject(project);
        } else {
            renderProject(project);
        }
    })

    // projectInput.value = "";
}

export function deleteProjectBtn(project, container) {
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('name', `${project.id}`);
    deleteBtn.id = `${project.id}-delete`

    container.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        deleteProject(project, container);

    })
}

export function deleteProject (project, container) {
    container.removeChild(project);
    const deleteBtn = document.getElementById(`${project.id}-delete`);
    container.removeChild(deleteBtn);
    
    const content = document.getElementById('content');
    const projectContent = document.getElementById(`${project.id}-container`);

    if(projectContent && content.contains(projectContent)){
    content.removeChild(content.firstChild);
    }
}