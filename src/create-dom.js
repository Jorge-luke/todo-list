import { Project } from "./project.js"
import { addProjectOnMenu, createNewProjectBtn, projectState } from "./new-project";
import { renderProject } from "./project.js";

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

    const defaultProject = new Project("default-project", "Default Project", "This is the default project", "01", "undefined");

    const projectID = defaultProject.id;
    const title = defaultProject.title;
    const description = defaultProject.description;
    const priority = defaultProject.priority;
    const dueDate = defaultProject.dueDate;
    
    addProjectOnMenu(defaultProject, projectID, title, description, priority, dueDate);

    const newProjectBtn = document.createElement('button');
    newProjectBtn.id = "new-project-btn";
    navBottom.appendChild(newProjectBtn);
    createNewProjectBtn();

    const content = document.createElement('div');
    content.id = "content";
    container.appendChild(content);
        if(!projectsHandler[projectID]){
        projectsHandler[projectID] = defaultProject;
        renderProject(defaultProject, projectID, title, description, priority, dueDate);
        } else {
            renderProject(defaultProject, projectID, title, description, priority, dueDate);
        }
}