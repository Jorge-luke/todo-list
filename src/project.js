import { addCreateCardBtn } from "./cards";
import { deleteProject, projectState, editProject } from "./new-project";

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
export function renderProject(project, projectID, title, description, priority, dueDate){
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

            const projectEdit = document.createElement('button');
            projectEdit.id = `${projectID}-edit-btn`;
            projectEdit.textContent = "EDIT";
            projectTop.appendChild(projectEdit);

            projectEdit.addEventListener('click', () => {
                editProject(project);
            })

            const projectDelete = document.createElement('button');
            projectDelete.id = `${projectID}-delete`;
            projectDelete.textContent = "DELETE";
            projectTop.appendChild(projectDelete);

            const projectToDelete = document.querySelector(`#${projectID}`);
            const projectWrapper = document.querySelector(`#${projectID}-btn-wrapper`);
            projectDelete.addEventListener('click', () => {
                deleteProject(projectToDelete, projectWrapper)
            })

            const projectMiddle = document.createElement('div');
            projectMiddle.id = `${projectID}-middle`;
            projectMiddle.classList.add('project-middle');
            projectContainer.appendChild(projectMiddle);

            const projectDescription = document.createElement('div');
            projectDescription.id = `${projectID}-description`;
            projectDescription.classList.add('project-description');
            projectDescription.textContent = `${description}`;
            projectMiddle.appendChild(projectDescription);

            const projectPriority = document.createElement('div');
            projectPriority.id = `${projectID}-priority`;
            projectPriority.classList.add('project-priority');
            projectPriority.textContent = `Priority: ${priority}`;
            projectMiddle.appendChild(projectPriority);

            const projectDueDate = document.createElement('div');
            projectDueDate.id = `${projectID}-due-date`;
            projectDueDate.classList.add('project-due-date');
            projectDueDate.textContent = `Due date: ${dueDate}`;
            projectMiddle.appendChild(projectDueDate);

            const cardCreatorContainer = document.createElement('div');
            cardCreatorContainer.id = "card-creator-container";
            projectContainer.appendChild(cardCreatorContainer);

            const projectContent = document.createElement('div');
            projectContent.classList.add('project-content');
            projectContainer.appendChild(projectContent);

            addCreateCardBtn(cardCreatorContainer);
        
        projectState.currentProject = `${projectID}`;
    }
}