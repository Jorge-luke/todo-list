import { addCreateCardBtn } from "./cards";
import { projectState } from "./new-project";
import { projectsHandler } from "./new-project";

export class Project {
    constructor(id, title, description, priority){
        this.id = id;
        this.title = title
        this.description = description;
        this.priority = priority;
        this.cards = [];
    }
}



// export function addProjectOnMenu(project, projectID, title, description, priority) {
export function renderProject(project, projectID, title, description, priority){
        const content = document.querySelector('#content');

        //only renders if this is a different project
        if(projectState.currentProject != projectID){
            if(!content) return;
            // Remove all previous content
            while(content.firstChild){
                content.removeChild(content.firstChild);
            }

            // Render new project
            const projectContainer = document.createElement('div');
            projectContainer.id = `${projectID}-container`;
            projectContainer.classList.add("project-container");
            content.appendChild(projectContainer);

            const projectTop = document.createElement('div');
            projectTop.classList.add('project-top-title');
            projectTop.textContent = `${title}`;
            projectContainer.appendChild(projectTop);

            const projectMiddle = document.createElement('div');
            projectMiddle.id = `${projectID}-middle`;
            projectContainer.appendChild(projectMiddle);

            const projectDescription = document.createElement('div');
            projectDescription.id = `${projectID}-description`;
            projectDescription.textContent = `${description}`;
            projectMiddle.appendChild(projectDescription);

            const cardCreatorContainer = document.createElement('div');
            cardCreatorContainer.id = "card-creator-container";
            projectContainer.appendChild(cardCreatorContainer);

            const projectContent = document.createElement('div');
            projectContent.classList.add('project-content');
            projectContainer.appendChild(projectContent);

            addCreateCardBtn(cardCreatorContainer);
        

        projectState.currentProject = `${projectID}`;
        console.log(project);
    }
}