import { projectsHandler, projectState } from "./new-project";
import { makeInput } from "./input";
import { dragItem, dragCard, updateProjectsOnLocalStorage, updateCurrentState} from "./functions.js"
import { switchFocus } from "./functions.js";
import { getTitleToID } from "./functions.js";
import  bin  from "./img/bin.png";
import  move  from "./img/move.png";

export class Card {
    constructor(id, title){
        this.id = id;
        this.title = title;
        this.items = [];
        this.type = "";
    }
}

export function addCreateCardBtn (container){
        if(!container.querySelector('#new-card-btn')){
        const newCardBtn = document.createElement('button');
        newCardBtn.id = "new-card-btn";
        newCardBtn.textContent = "Add new Cards";
        container.appendChild(newCardBtn);



        newCardBtn.addEventListener('click', () => {
            createCardPopUp();
        })
        }
    }

function createCardPopUp(){
    const projectContainer = document.querySelector(".project-content");
    
    const cardCreatorContainer = document.querySelector('#card-creator-container');

    // if there's no card creator, add it to its container
    if(!cardCreatorContainer.querySelector("#card-creator")){
        const cardCreator = document.createElement('div');
        cardCreator.id = "card-creator";
        cardCreatorContainer.appendChild(cardCreator);
        cardCreatorContainer.className = 'card-creator-show';

        const cancelCardCreation = document.createElement('img');
        cancelCardCreation.id = "cancel-card-creation";
        cancelCardCreation.src = bin;
        cardCreatorContainer.appendChild(cancelCardCreation);
        cancelCardCreation.addEventListener("click", ()=> {
            const existingCardCreator = document.querySelector('#card-creator');
            cardCreatorContainer.removeChild(existingCardCreator);
            cardCreatorContainer.className = "card-creator-hidden";
            cardCreatorContainer.removeChild(cancelCardCreation);
        })
        
    }else {
    // if it's there already, remove it
        const existingCardCreator = document.querySelector('#card-creator');
        cardCreatorContainer.removeChild(existingCardCreator);
        cardCreatorContainer.className = "card-creator-hidden";
        if(cardCreatorContainer.querySelector('#cancel-card-creation')){
        cardCreatorContainer.removeChild(cardCreatorContainer.querySelector('#cancel-card-creation'));
        }
        return; // <-This stops the rest of the function
    }

    // structure of the card creator Pop Up
    const cardPopUpTitle = document.createElement('div');
    cardPopUpTitle.id = "card-pop-up-title";
    cardPopUpTitle.textContent = "Create new card of:";
    const cardCreator = document.querySelector('#card-creator');
    cardCreator.appendChild(cardPopUpTitle);

    makeInput ("Notes", "radio", "notes", "card-type", "", cardCreator, "card-creator-input", "card-creator-label");
    makeInput ("Checklist", "radio", "checklist", "card-type", "", cardCreator, "card-creator-input", "card-creator-label");
    makeInput ("", "text", "card-title-input", "card-title-input", "card title", cardCreator, "card-title-input", "none");
    // after selecting one option, focus on input for card title
    const radios = document.querySelectorAll('.card-creator-input');
    radios.forEach((element) => {
        element.addEventListener('click', ()=>{
            const focused = document.querySelector('#card-title-input');
            switchFocus(focused);
        })
    })

    const createCardBtn = document.createElement('button');
    createCardBtn.textContent = "Confirm";
    createCardBtn.id = "create-card-button";
    cardCreator.appendChild(createCardBtn);

    function newCard() {
    const cardTitleContent = document.querySelector('#card-title-input');
    const cardTitleValue = cardTitleContent.value.trim();
    if(!cardTitleValue){
        alert("Please enter a card title!");
        return;
    }
    const cardTitleContentToId = getTitleToID(cardTitleContent.value);
    if(document.querySelector(`#${cardTitleContentToId}-card`)){
        alert("card already exists!");
    } else {
        const notes = document.querySelector('#notes');
        const checklist = document.querySelector('#checklist');
        if(notes.checked){
            createCard(cardTitleValue, "notes");
            
        } else if(checklist.checked){
            createCard(cardTitleValue, "checklist");
        }else{
            alert('Choose the type of card!');
        }
    }
}

    const cardTitleInput = cardCreator.querySelector('#card-title-input');

    createCardBtn.addEventListener('click', () => {
        newCard();
        switchFocus(cardTitleInput);
        cardTitleInput.value = "";
    } )
    cardTitleInput.addEventListener('keydown', (event) => {
        if(event.key == "Enter"){
        newCard();
        cardTitleInput.value = "";
        }
    })
}
function createCard(cardTitleValue, cardType){
    const cardID = getTitleToID(cardTitleValue);
    const card = new Card(cardID, cardTitleValue);
    card.id = cardID;
    projectsHandler[projectState.currentProject].cards.push(card);
    card.type = cardType;

    renderCard(card);
     updateProjectsOnLocalStorage();
}

export function renderCard(card){
     const container = document.querySelector('.project-content');

     const cardID = card.id;

    const cardBody = document.createElement('div');
    cardBody.id = `${card.id}-card`;
    cardBody.classList.add('card-body');
    container.appendChild(cardBody);

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    cardBody.appendChild(titleContainer);



    const moveCard = document.createElement('button');

    moveCard.classList.add('move-card');
    moveCard.id = `${cardID}-move-card`;
    titleContainer.appendChild(moveCard);
    moveCard.addEventListener("mousedown", () => {
        dragCard(".card-body", container);
        cardBody.setAttribute('draggable', "true");
    })
    moveCard.addEventListener("mouseleave", () => {
        cardBody.removeAttribute('draggable', "true");

    })

    const deleteCardBtn = document.createElement('img');
    deleteCardBtn.src = bin;
    deleteCardBtn.classList.add('delete-btn');
    deleteCardBtn.id = `${cardID}-delete-btn`;
    titleContainer.appendChild(deleteCardBtn);

        deleteCardBtn.addEventListener('click', () => {
        deleteCard(projectsHandler[projectState.currentProject], card, container, cardBody);
    })

        const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = card.title;
    titleContainer.appendChild(cardTitle);

    cardBody.setAttribute('type', card.type);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    btnContainer.id = `${cardID}-btn-container`;
    cardBody.appendChild(btnContainer);

    const itemContainer = document.createElement('div');
    itemContainer.id = `${cardID}-item-container`;

    itemContainer.classList.add('item-container');
    cardBody.appendChild(itemContainer);

    itemContainer.innerHTML = "";

    const showItemInputBtn = document.createElement('button');
    showItemInputBtn.id = `${cardID}-show-item-input-btn`;
    showItemInputBtn.classList.add('show-item-input-btn');
    showItemInputBtn.textContent = "New Item";
    btnContainer.appendChild(showItemInputBtn);
    showItemInputBtn.addEventListener("click", () => {
        if(!btnContainer.querySelector(`#${cardID}-item-input-wrapper`)){
        showItemInput(card, card.type, cardID, btnContainer);
        } else {
            const itemInputWrapper = btnContainer.querySelector(`#${cardID}-item-input-wrapper`);
            btnContainer.removeChild(itemInputWrapper);
        }
    })

    itemContainer.innerHTML = "";
    card.items.forEach((itemData) => {
        if (!itemData || typeof itemData.value === "undefined") return;
        createNewItem(card, itemData.value, card.type, cardID, itemData);
    })
        dragItem(`${card.id}-item`, itemContainer);
}

    function showItemInput(card, cardType, cardId, container){
    const itemInputWrapper = document.createElement('div');
    itemInputWrapper.classList.add('item-input-wrapper');
    itemInputWrapper.id = `${cardId}-item-input-wrapper`;
    container.appendChild(itemInputWrapper);

    const cardInput = makeInput("+", "text", `${cardId}-item-input`, "item-input", "new text", itemInputWrapper, "item-input", "item-input-label");

    const itemValue = document.querySelector(`#${cardId}-item-input`);

    switchFocus(itemValue);
    itemValue.addEventListener('keydown', (event) => {
        if(event.key == "Enter"){
            createNewItem(card, itemValue.value, cardType, cardId);
            itemValue.value = "";
        }
    });

    const newItemBtn = document.createElement('button');
    newItemBtn.id = `${cardId}-new-item-btn`;
    newItemBtn.classList.add('new-item-btn');
    newItemBtn.textContent = "confirm";
    itemInputWrapper.appendChild(newItemBtn);

    newItemBtn.addEventListener('click', () => {
        createNewItem(card, itemValue.value, cardType, cardId);
        itemValue.value = "";
    });
}

function deleteCard(project, card, container, cardBody) {
    container.removeChild(cardBody);
    const index = project.cards.findIndex(obj => obj.id === card.id);
    if (index > -1){
        project.cards.splice(index, 1);
    updateProjectsOnLocalStorage();
    }

    updateProjectsOnLocalStorage();
    updateCurrentState();

}

function createNewItem (card, itemValue, cardType, cardId, itemData){
    if (!itemValue) return;
    const item = document.createElement('div');
    if(!document.querySelector(`#${getTitleToID(itemValue)}`)){
    item.id = getTitleToID(itemValue);
    } else {
        item.id = `${getTitleToID(itemValue)}-${Date.now()}`;
    }
    item.classList.add("item");
    item.classList.add(`${cardId}-item`);
    item.setAttribute('draggable', "true");
    
    const itemText = document.createElement('div');
    itemText.id = `${item.id}-text`;
    itemText.classList.add('item-text');
    item.appendChild(itemText);

if (!itemData) {
    if (cardType === "checklist") {
        itemData = {
            value: itemValue,
            id: item.id,
            checked: false
        };
    } else {
        itemData = {
            value: itemValue,
            id: item.id
        };
    }
    card.items.push(itemData);
}
    updateCurrentState();
    updateProjectsOnLocalStorage();

    if(cardType == "checklist"){
        const itemCheck = new makeInput("", 'checkbox', `${item.id}-checkbox`, `${item.id}-checkbox`, "", item, "item-checkbox", "");
        if(itemData && itemData.checked) itemCheck.checked = true;
itemCheck.addEventListener('change', () => {
    if (!item || !item.id || !Array.isArray(card.items)) return;
    const obj = card.items.find(obj => obj.id === item.id);
    if (obj) obj.checked = itemCheck.checked;
    updateCurrentState();
    updateProjectsOnLocalStorage();
});
    }

    const deleteItemBtn = document.createElement('img');
    deleteItemBtn.src = bin;
    deleteItemBtn.id = `${item.id}-delete-btn`
    deleteItemBtn.classList.add('item-delete-btn');
    item.appendChild(deleteItemBtn);

    const focused = document.querySelector(`#${cardId}-item-input`);
    if(focused){
    switchFocus(focused);
    }

    itemText.textContent = `${itemValue}`;

    const itemContainer = document.querySelector(`#${cardId}-item-container`);
    itemContainer.appendChild(item);

        deleteItemBtn.addEventListener('click', () => {
        deleteItem(card, itemContainer, item); // (card, item)
    })
    item.setAttribute("item-value", itemValue);

}

function deleteItem(card, container, item){
    container.removeChild(item);
    if(!item) return;
    const index = card.items.findIndex(obj => obj.id === item.id);
    if (index > -1){
        card.items.splice(index, 1);
    updateProjectsOnLocalStorage();
    }
    updateCurrentState();
}