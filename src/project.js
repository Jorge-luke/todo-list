import { addCreateCardBtn } from "./cards";
import { projectState } from "./new-project";

export class Project {
    constructor(id, title){
        this.cards = [];
        this.id = id;
        this.title = title
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

            const projectContent = document.createElement('div');
            projectContent.classList.add('project-content');
            projectContainer.appendChild(projectContent);

            addCreateCardBtn(projectContainer);
        

        projectState.currentProject = `${project.id}`;
        console.log(project)
        

    }
}