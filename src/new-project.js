import { Project } from "./project.js";
export const projectState = { currentProject: ""}

const projectIds = ["default-project"];


export function newProjectBtn (){
    const newProjectBtn = document.querySelector('#new-project-btn');
    newProjectBtn.addEventListener('click', () => {

        if(document.querySelector('#new-project-wrapper')){
            return;
        }

        const createNewProject = document.createElement('div');
        createNewProject.id = "new-project-wrapper";
        document.querySelector('#nav-bottom').appendChild(createNewProject);
        
        const newProjectTitle = document.createElement('input');
        newProjectTitle.type = "text";
        newProjectTitle.id = "new-project-title";
        createNewProject.appendChild(newProjectTitle);

        const addNewProject = document.createElement('button');
        addNewProject.id = "add-new-project";
        createNewProject.appendChild(addNewProject);

        newProjectTitle.addEventListener("keydown", (event)=>{
            if (event.key == "Enter"){
                addProjectOnMenu();
            }
        })

        addNewProject.addEventListener("click", () => {
        addProjectOnMenu();
    })
    });
}

export function addProjectOnMenu() {
    let projectTitleInput = document.querySelector("#new-project-title");
    
    const newProjectTitle = document.createElement('button');
    newProjectTitle.textContent = `${projectTitleInput.value}`
    newProjectTitle.classList.add('project-select');

    if(!projectIds.includes(`${projectTitleInput.value}-project`)){
        newProjectTitle.id = `${projectTitleInput.value}-project`;
        projectIds.push(`${projectTitleInput.value}-project`)
        
        const projectMenu = document.querySelector('#project-menu');
        projectMenu.appendChild(newProjectTitle);
    } else {
        alert("This Project already exists!");
    }

    newProjectTitle.addEventListener("click", () => {
        const project = new Project(`${newProjectTitle.id}`, `${newProjectTitle.textContent}`);
        project.showProject();
    })

    projectTitleInput.value = "";
}