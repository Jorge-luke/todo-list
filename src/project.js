import { projectState } from "./new-project";

export class Project {
    constructor(id, title){
        this.cards = [];
        this.id = id;
        this.title = title
    }

    showProject(){
        const content = document.querySelector('#content');

        if(projectState.currentProject != `${this.id}`){
            while(content.firstChild){
                content.removeChild(content.firstChild);
            }
            const projectContainer = document.createElement('div');
            projectContainer.id = `${this.id}`;
            projectContainer.classList.add("project-container");
            content.appendChild(projectContainer);

            const projectTop = document.createElement('div');
            projectTop.classList.add('project-top-title');
            projectTop.textContent = `${this.title}`;
            projectContainer.appendChild(projectTop);

            const projectContent = document.createElement('div');
            projectContent.classList.add('project-content');
            projectContainer.appendChild(projectContent);

        projectState.currentProject = `${this.id}`;
        }
    }
}