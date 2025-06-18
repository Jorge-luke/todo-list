import { Project } from "./project.js";
import { renderProject } from "./project.js";
import { addCreateCardBtn } from "./cards.js";
import { makeInput } from "./input.js";
export const projectState = { currentProject: ""};
import { getTitleToID, switchFocus } from "./functions.js";

export const projectsHandler = [];
window.projectsHandler = projectsHandler;


export function createNewProjectBtn (){
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
    const project = new Project(id, title, description, priority);
    addProjectOnMenu(project, id, title, description, priority);
    switchFocus(ProjectInputTitle);

        })
    }
    });
}

export function addProjectOnMenu(project, projectID, title, description, priority) {

    const projectWrapper = document.createElement('div');
    projectWrapper.id = `${projectID}-btn-wrapper`;
    projectWrapper.classList.add('project-btn-wrapper');

    const projectMenu = document.querySelector('#project-menu');
    projectMenu.appendChild(projectWrapper);
    
 
    
    const projectBtn = document.createElement('button');
    projectBtn.id = projectID;
    projectBtn.classList.add('project-select');
    projectBtn.textContent = title;
    projectWrapper.appendChild(projectBtn);

    const projectDescription = description;

    const projectPriority = document.createElement('div');
    projectPriority.id = `${projectID}-btn-priority`;
    projectPriority.classList.add('project-btn-priority');
    projectPriority.textContent = `Priority: ${priority}`;
    projectWrapper.appendChild(projectPriority);

    

    deleteProjectBtn(projectBtn, projectWrapper);


    projectBtn.addEventListener("click", () => {
        if(!projectsHandler.includes(project)){
        projectsHandler.push(project);
        renderProject(project);
        } else {
            renderProject(project, projectID, title, description, priority);
        }
    })

}

export function deleteProjectBtn(project, projectWrapper) {
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('name', `${project.id}`);
    deleteBtn.id = `${project.id}-delete`

    projectWrapper.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        deleteProject(project, projectWrapper);
    });
}

export function deleteProject (project, projectWrapper) {
    const projectMenu = document.getElementById("project-menu");
    projectMenu.removeChild(projectWrapper);
    

    const content = document.getElementById('content');
    const projectContent = document.getElementById(`${project.id}-container`);

    if(projectContent && content.contains(projectContent)){
    content.removeChild(projectContent);
    }
}