import { Project } from "./project.js";
import { renderProject } from "./project.js";
import { addCreateCardBtn } from "./cards.js";
export const projectState = { currentProject: ""}

const projectIds = ["default-project"];


export function newProjectBtn (){
    const newProjectBtn = document.querySelector('#new-project-btn');
    newProjectBtn.addEventListener('click', () => {
        if(document.querySelector('#new-project-wrapper')){
            const newProjectWrapper = document.querySelector('#new-project-wrapper');
            newProjectWrapper.remove();
        } else {

        const createNewProject = document.createElement('div');
        createNewProject.id = "new-project-wrapper";
        document.querySelector('#nav-bottom').appendChild(createNewProject);
        
        const projectBtn = document.createElement('input');
        projectBtn.type = "text";
        projectBtn.id = "new-project-title";
        createNewProject.appendChild(projectBtn);
        projectBtn.focus();

        const addNewProject = document.createElement('button');
        addNewProject.id = "add-new-project";
        createNewProject.appendChild(addNewProject);

        projectBtn.addEventListener("keydown", (event)=>{
            if (event.key == "Enter"){
                addProjectOnMenu();
            }

        })

        addNewProject.addEventListener("click", () => {
        addProjectOnMenu();
         })
        }
    
    });
}

export function addProjectOnMenu() {
    let projectInput = document.querySelector("#new-project-title");
    
    const projectBtn = document.createElement('button');
    projectBtn.textContent = `${projectInput.value}`;
    projectBtn.classList.add('project-select');

    if(!projectIds.includes(`${projectInput.value}-project`)){
        projectBtn.id = `${projectInput.value}-project`;
        projectIds.push(`${projectInput.value}-project`);
        
        const projectMenu = document.querySelector('#project-menu');
        projectMenu.appendChild(projectBtn);

    deleteProjectBtn(projectBtn, projectMenu);
    } else {
        alert("This Project already exists!");
    }    

    projectBtn.addEventListener("click", () => {
        const project = new Project(`${projectBtn.id}`, `${projectBtn.textContent}`);
        renderProject(project);
    })

    projectInput.value = "";
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