import { loadProjectsFromLocalStorage, updateProjectsOnLocalStorage } from "./functions.js"
import {  addProjectOnMenu, createNewProjectBtn, projectsHandler, projectState } from "./new-project";
import { Project, renderProject } from "./project.js"


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

    if(Object.keys(projectsHandler).length === 0){
    const defaultProject = new Project("default-project", "Default Project", "This is the default project", "01", "");
    projectsHandler[defaultProject.id] = defaultProject;
    addProjectOnMenu(defaultProject);
    }

    const newProjectBtn = document.createElement('button');
    newProjectBtn.id = "new-project-btn";
    navBottom.appendChild(newProjectBtn);
    createNewProjectBtn();

    const content = document.createElement('div');
    content.id = "content";
    container.appendChild(content);

        renderProject(projectState.currentProject);
    
        loadProjectsFromLocalStorage();
}