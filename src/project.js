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




export function renderProject(project){
        const content = document.querySelector('#content');

        //only renders if this is a different project
        if(projectState.currentProject != project.id){
            if(!content) return;
            // Remove all previous content
            while(content.firstChild){
                content.removeChild(content.firstChild);
            }

            // Render new project
            const projectContainer = document.createElement('div');
            projectContainer.id = `${project.id}-container`;
            projectContainer.classList.add("project-container");
            content.appendChild(projectContainer);

            const projectTop = document.createElement('div');
            projectTop.classList.add('project-top-title');
            projectTop.textContent = `${project.title}`;
            projectContainer.appendChild(projectTop);

            const cardCreatorContainer = document.createElement('div');
            cardCreatorContainer.id = "card-creator-container";
            projectContainer.appendChild(cardCreatorContainer);
            // create container between title and container to always fit card creator popup 


            const projectContent = document.createElement('div');
            projectContent.classList.add('project-content');
            projectContainer.appendChild(projectContent);

            addCreateCardBtn(cardCreatorContainer);
        

        projectState.currentProject = `${project.id}`;
        console.log(project);
    }
}