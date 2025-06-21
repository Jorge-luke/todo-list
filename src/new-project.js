import { Project } from "./project.js";
import { renderProject } from "./project.js";
import { makeInput } from "./input.js";
import { getTitleToID, switchFocus } from "./functions.js";
import { makeSelect } from "./input.js";
import { isAfter, parseISO, startOfDay } from "../node_modules/date-fns";
//
export const projectState = { currentProject: ""};
export const projectsHandler = {};
//
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

    makeInput("New Project: ", "text", "new-project-title", 
        "new-project-title", "project name", createNewProject, "new-project-input", "new-project-label");

    const projectInputTitle = document.querySelector("#new-project-title");
    projectInputTitle.focus();

    const addProjectBtn = document.createElement('button');
    addProjectBtn.id = "add-new-project";
    container.appendChild(addProjectBtn);

    const descriptionInput = makeInput("Description: ", "text", "new-project-description", 
        "new-project-description", "description", inputWrapper, "new-project-input", "new-project-label");

    const prioritySelect = makeSelect("Priority: ", "new-project-priority", inputWrapper, "new-project-priority", "new-project-label", "new-project-select", "01", "02", "03");

    const dueDateInput = makeInput("Due Date: ", "date", "new-project-due-date", "new-project-due-date", "Select date limit", inputWrapper, "new-project-input", "new-project-label");

    projectInputTitle.addEventListener("keydown", (event)=>{
        if (event.key == "Enter"){
            handleAddProject();
        }
    })
    descriptionInput.addEventListener("keydown", (event)=>{
        if (event.key == "Enter"){
            handleAddProject();
        }
    })
    prioritySelect.addEventListener("keydown", (event)=>{
        if (event.key == "Enter"){
            handleAddProject();
        }
    })
    dueDateInput.addEventListener("keydown", (event)=>{
        if (event.key == "Enter"){
            handleAddProject();
        }
    })
    addProjectBtn.addEventListener("click", () => {
        handleAddProject();
        })
    }
    });
}

export function addProjectOnMenu(project, projectID, title, description, priority, dueDate) {
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

    deleteProjectBtn(projectBtn, projectWrapper);

    const projectDescription = description;

    const projectPriority = document.createElement('div');
    projectPriority.id = `${projectID}-btn-priority-btn`;
    projectPriority.classList.add('project-btn-priority');
    projectPriority.textContent = `Priority: ${priority}`;
    projectWrapper.appendChild(projectPriority);

    const projectDueDate = document.createElement('div');
    projectDueDate.id = `${projectID}-btn-due-date-btn`;
    projectDueDate.classList.add('project-btn-due-date');
    projectDueDate.textContent = `Due date: ${dueDate}`;
    projectWrapper.appendChild(projectDueDate);

    projectBtn.addEventListener("click", () => {
            projectState.currentProject = projectID;
            renderProject(projectsHandler[projectState.currentProject]);
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

    delete projectsHandler[project.id];
    
    if(projectState.currentProject = project.id){
        projectState.currentProject = "";
    }
}

export function editProject(project) {
    const container = document.querySelector(".project-top-title");

    if(document.querySelector("#edit-container")){
        container.removeChild(document.querySelector("#edit-container"));
        return;
    }

    const editContainer = document.createElement('div');
    editContainer.id = "edit-container";
    container.appendChild(editContainer);    

    const editStarter = document.createElement('div');
    editStarter.id = "edit-starter";
    editStarter.textContent = "Editing project: ";
    editContainer.appendChild(editStarter);

    const currentTitle = makeInput("Project title: ", "text", "edit-project-title", "edit-project-title", "", editContainer, "edit-project-input", "edit-project-label");
    currentTitle.value = project.title;
    const currentDescription = makeInput("Project description: ", "text", "edit-project-description", "edit-project-description", " ", editContainer, "edit-project-input", "edit-project-label");
    currentDescription.value = project.description;
    const currentPriority = makeSelect("Project priority: ", "edit-project-priority", editContainer, "edit-project-priority", "edit-project-label", "edit-project-input", "01", "02", "03");
    currentPriority.value = project.priority;
    const currentDueDate = makeInput("Peoject due date: ", "date", "edit-project-due-date", "edit-project-due-date", " ", editContainer, "edit-project-input", "edit-project-label");
    currentDueDate.value = project.dueDate;

    const sendEditBtn = document.createElement('button');
    sendEditBtn.id = "send-edit-btn";
    sendEditBtn.textContent = "Confirm changes";
    editContainer.appendChild(sendEditBtn);

    sendEditBtn.addEventListener('click', () => {
        editProjectConfirm(project);
    })
}

export function editProjectConfirm(project){
    const oldProjectID = project.id;
    const newProjectTitle = document.querySelector('#edit-project-title').value;
    const newProjectID = getTitleToID(newProjectTitle);

    if (newProjectID !== oldProjectID && projectsHandler[newProjectID]) {
    alert("A project with this title already exists!");
    return;
    }
    const newProjectDescription = document.querySelector('#edit-project-description').value;
    const newProjectPriority = document.querySelector('#edit-project-priority').value;
    const newProjectDueDate = document.querySelector('#edit-project-due-date').value;

        const today = startOfDay(new Date());
    const dueDateObj = parseISO(newProjectDueDate);
    
    if(newProjectDueDate && !isAfter(dueDateObj, today)){
        alert("Pick a date in future!");
        return;
    }

    delete projectsHandler[oldProjectID];

    project.id = newProjectID;
    project.title = newProjectTitle;
    project.description = newProjectDescription;
    project.priority = newProjectPriority;
    project.dueDate = newProjectDueDate;

    projectsHandler[newProjectID] = project;
    projectState.currentProject = newProjectID;

    const projectWrapper = document.querySelector(`#${oldProjectID}-btn-wrapper`);
    if(projectWrapper){
        projectWrapper.remove();
    }

    projectsHandler[newProjectID].cards = project.cards;

    addProjectOnMenu(project, project.id, project.title, project.description, project.priority, project.dueDate);
    renderProject(project);
}

function handleAddProject(){
    const title = document.querySelector("#new-project-title");
    const id = getTitleToID(title.value);
    const description = document.querySelector("#new-project-description");
    const priority = document.querySelector("#new-project-priority");
    const dueDate = document.querySelector("#new-project-due-date");

    const today = startOfDay(new Date());
    const dueDateObj = parseISO(dueDate.value);
    
    if(dueDate.value && !isAfter(dueDateObj, today)){
        alert("Pick a date in future!");
        return;
    }


    const project = new Project(id, title.value, description.value, priority.value, dueDate.value);
    const projectInputTitle = document.querySelector("#new-project-title");
        switchFocus(projectInputTitle);
        if(!projectsHandler[id]){
        projectsHandler[id] = project;
    } else {
        alert("project already exists!");
        return;
    }
    addProjectOnMenu(project, id, title.value, description.value, priority.value, dueDate.value);
    title.value = "";
    description.value = "";
    priority.value = "01";
    dueDate.value = ""
}