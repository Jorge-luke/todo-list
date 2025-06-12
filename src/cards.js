import { projectState } from "./new-project";

export function addCreateCardBtn (contanier){
        if(!container.querySelector('#new-card-btn')){
        const container = document.querySelector('.project-content');
        const newCardBtn = document.createElement('button');
        newCardBtn.id = "new-card-btn";
        container.appendChild(newCardBtn);

        newCardBtn.addEventListener('click', () => {
            createCardPopUp();
        })
        }
    }
    
function createCardPopUp(){
    const projectContainer = document.querySelector(".project-content");
    
    const cardCreator = document.createElement('div');
    cardCreator.id = 'card-creator-container';

    if(!projectContainer.querySelector("#card-creator-container")){
    projectContainer.appendChild(cardCreator);
    }else {
        const existingCardCreator = document.querySelector('#card-creator-container');
        projectContainer.removeChild(existingCardCreator);
    }


}