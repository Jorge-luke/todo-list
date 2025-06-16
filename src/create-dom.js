import { Project } from "./project.js"
import { projectState } from "./new-project";
import { renderProject } from "./project.js";
import { deleteProjectBtn } from "./new-project";

export function createDOM(){
    const container = document.getElementById('container');

    const pageTitle = document.createElement('div');
    pageTitle.id = "page-title";
    pageTitle.textContent = "My TODO LIST";
    container.appendChild(pageTitle);

    const nav = document.createElement('nav');
    nav.id = "nav";
    container.appendChild(nav);

    const navTop = document.createElement('div');
    navTop.id = "nav-top"
    nav.appendChild(navTop);

    const navTopText = document.createElement('p');
    navTopText.id = "nav-top-text"
    navTopText.textContent = "PROJECTS: "
    navTop.appendChild(navTopText);
    
    const navBottom = document.createElement('div');
    navBottom.id = "nav-bottom";
    nav.appendChild(navBottom);

    const projectMenu = document.createElement('div');
    projectMenu.id = "project-menu";
    navBottom.appendChild(projectMenu);

    const defaultProject = document.createElement('button');
    defaultProject.classList.add('project-select');
    defaultProject.id = "default-project";
    defaultProject.textContent = "Project One";
    projectMenu.appendChild(defaultProject);

    const newProjectBtn = document.createElement('button');
    newProjectBtn.id = "new-project-btn";
    navBottom.appendChild(newProjectBtn);


    const content = document.createElement('div');
    content.id = "content";
    container.appendChild(content);

    insertDefaultProject();
    deleteProjectBtn(defaultProject, projectMenu);
}

export function insertDefaultProject(){
    const defaultProjectBtn = document.getElementById('default-project');
    
    if(projectState.currentProject != `${defaultProjectBtn.id}`){
    const defaultProject = new Project (`${defaultProjectBtn.id}`, `${defaultProjectBtn.textContent}`);
    renderProject(defaultProject);
    }

}

export function clickDefaultProject(){
    const defaultProject = document.getElementById('default-project');
    defaultProject.addEventListener('click', () => {
    insertDefaultProject();
});
}