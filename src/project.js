import { addCreateCardBtn } from "./cards";
import { deleteProject, projectState, editProject, projectsHandler } from "./new-project";
import { renderCard } from "./cards";

export class Project {
    constructor(id, title, description, priority, dueDate){
        this.id = id;
        this.title = title
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.cards = [];
    }
}

// export function addProjectOnMenu(project, projectID, title, description, priority) {
export function renderProject(project){
        const content = document.querySelector('#content');

        //only renders if this is a different project
        if(projectState.currentProject == project.id){
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

            const projectEdit = document.createElement('button');
            projectEdit.id = `${project.id}-edit-btn`;
            projectEdit.textContent = "EDIT";
            projectTop.appendChild(projectEdit);

            projectEdit.addEventListener('click', () => {
                editProject(project);
            })

            const projectDelete = document.createElement('button');
            projectDelete.id = `${project.id}-delete`;
            projectDelete.textContent = "DELETE";
            projectTop.appendChild(projectDelete);

            const projectToDelete = document.querySelector(`#${project.id}`);
            const projectWrapper = document.querySelector(`#${project.id}-btn-wrapper`);
            projectDelete.addEventListener('click', () => {
                deleteProject(projectToDelete, projectWrapper)
            })

            const projectMiddle = document.createElement('div');
            projectMiddle.id = `${project.id}-middle`;
            projectMiddle.classList.add('project-middle');
            projectContainer.appendChild(projectMiddle);

            const projectDescription = document.createElement('div');
            projectDescription.id = `${project.id}-description`;
            projectDescription.classList.add('project-description');
            projectDescription.textContent = `${project.description}`;
            projectMiddle.appendChild(projectDescription);

            const projectPriority = document.createElement('div');
            projectPriority.id = `${project.id}-priority`;
            projectPriority.classList.add('project-priority');
            projectPriority.textContent = `Priority: ${project.priority}`;
            projectMiddle.appendChild(projectPriority);

            const projectDueDate = document.createElement('div');
            projectDueDate.id = `${project.id}-due-date`;
            projectDueDate.classList.add('project-due-date');
            projectDueDate.textContent = `Due date: ${project.dueDate}`;
            projectMiddle.appendChild(projectDueDate);

            const cardCreatorContainer = document.createElement('div');
            cardCreatorContainer.id = "card-creator-container";
            projectContainer.appendChild(cardCreatorContainer);

            const projectContent = document.createElement('div');
            projectContent.classList.add('project-content');
            projectContainer.appendChild(projectContent);

            addCreateCardBtn(cardCreatorContainer);
        
        projectState.currentProject = `${project.id}`;

        project.cards.forEach((card) => {
            renderCard(card);
        })
    }
}