import { addCreateCardBtn } from "./cards";
import { deleteProject, projectState, editProject, projectsHandler } from "./new-project";
import { renderCard } from "./cards";
import { format, parseISO } from "../node_modules/date-fns";
import { updateCurrentState, loadCurrentState, updateProjectsOnLocalStorage } from "./functions.js";
import  bin  from "./img/bin.png";

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
        if (!project) {
        return;
        }
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
            projectEdit.classList.add('project-edit-btn')
            projectEdit.textContent = "EDIT";
            projectTop.appendChild(projectEdit);

            projectEdit.addEventListener('click', () => {
                editProject(project);
            })

            const projectDelete = document.createElement('img');
            projectDelete.src = bin;
            projectDelete.id = `${project.id}-delete`;
            projectDelete.classList.add('project-delete-btn');
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

            if(project.dueDate){
            const localDate = parseISO(project.dueDate);
            const formattedDate = format(localDate, "MM/dd/yyyy");
            projectDueDate.textContent = `Due date: ${formattedDate}`;
            projectMiddle.appendChild(projectDueDate);
            } else {
            projectDueDate.textContent = `Due date: not defined!`;
            projectMiddle.appendChild(projectDueDate);
            }

            const cardCreatorContainer = document.createElement('div');
            cardCreatorContainer.id = "card-creator-container";
            cardCreatorContainer.className = "card-creator-hidden";
            projectContainer.appendChild(cardCreatorContainer);

            const projectContent = document.createElement('div');
            projectContent.classList.add('project-content');
            projectContainer.appendChild(projectContent);

            addCreateCardBtn(cardCreatorContainer);
        
        projectState.currentProject = `${project.id}`;
        updateCurrentState();
        updateProjectsOnLocalStorage();

        project.cards.forEach((card) => {
            renderCard(card);
        })
    }
}