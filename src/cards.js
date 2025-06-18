import { projectState } from "./new-project";
import { makeInput } from "./input";
import { dragItem, dragCard} from "./functions.js"
import { switchFocus } from "./functions.js";
import { getTitleToID } from "./functions.js";
import { deleteItem } from "./functions.js";

export class Card {
    constructor(title, project){
        this.title = title;
        this.project = project;
    }
}

export function addCreateCardBtn (container){
        if(!container.querySelector('#new-card-btn')){
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
    
    const cardCreatorContainer = document.querySelector('#card-creator-container');

    // if there's no card creator, add it to its container
    if(!cardCreatorContainer.querySelector("#card-creator")){
        const cardCreator = document.createElement('div');
        cardCreator.id = "card-creator";
        cardCreatorContainer.appendChild(cardCreator);
    }else {
    // if it's there already, remove it
        const existingCardCreator = document.querySelector('#card-creator');
        cardCreatorContainer.removeChild(existingCardCreator);
        return; // <-This stops the rest of the function
    }

    // structure of the card creator Pop Up
    //
    const cardPopUpTitle = document.createElement('div');
    cardPopUpTitle.id = "card-pop-up-title";
    cardPopUpTitle.textContent = "Create new card of:";
    const cardCreator = document.querySelector('#card-creator');
    cardCreator.appendChild(cardPopUpTitle);

    makeInput ("Notes", "radio", "notes", "card-type", "", cardCreator, "card-creator-input", "card-creator-label");
    makeInput ("Checklist", "radio", "checklist", "card-type", "", cardCreator, "card-creator-input", "card-creator-label");
    makeInput ("", "text", "card-title-input", "card-title-input", "card title", cardCreator, "card-title-input", "none");
    //

    // after selecting one option, focus on input for card title
    const radios = document.querySelectorAll('.card-creator-input');
    radios.forEach((element) => {
        element.addEventListener('click', ()=>{
            const focused = document.querySelector('#card-title-input');
            switchFocus(focused);
        })
    })

    const createCardBtn = document.createElement('button');
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
        if(notes.checked || checklist.checked){
            createCard(document.querySelector('#card-title-input').value, `${projectState.currentProject}`);
        } else {
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

function createCard(cardTitleValue, project){
    const container = document.querySelector('.project-content');
    const card = new Card(cardTitleValue, project);

    const cardID = getTitleToID(cardTitleValue);
    const cardBody = document.createElement('div');
    cardBody.id = `${cardID}-card`;
    cardBody.classList.add('card-body');
    container.appendChild(cardBody);

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    cardBody.appendChild(titleContainer);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = cardTitleValue;
    titleContainer.appendChild(cardTitle);
    
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

    const deleteCardBtn = document.createElement('button');
    deleteCardBtn.classList.add('delete-btn');
    deleteCardBtn.id = `${cardID}-delete-btn`;
    titleContainer.appendChild(deleteCardBtn);

    deleteCardBtn.addEventListener('click', () => {
        deleteItem(container, cardBody);
    })

    const cardType = getCardType();
    cardBody.setAttribute('type', cardType);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    btnContainer.id = `${cardID}-btn-container`;
    cardBody.appendChild(btnContainer);

    const itemContainer = document.createElement('div');
    itemContainer.id = `${cardID}-item-container`;
    cardBody.appendChild(itemContainer);

    const showItemInputBtn = document.createElement('button');
    showItemInputBtn.id = `${cardID}-show-item-input-btn`;
    btnContainer.appendChild(showItemInputBtn);
    showItemInputBtn.addEventListener("click", () => {
        if(!btnContainer.querySelector(`#${cardID}-item-input-wrapper`)){
        showItemInput(cardTitleValue, cardType, cardID, btnContainer);
        } else {
            const itemInputWrapper = btnContainer.querySelector(`#${cardID}-item-input-wrapper`);
            btnContainer.removeChild(itemInputWrapper);
        }
    })
}

    function showItemInput(cardTitleValue, cardType, cardId, container){
    const itemInputWrapper = document.createElement('div');
    itemInputWrapper.classList.add('item-input-wrapper');
    itemInputWrapper.id = `${cardId}-item-input-wrapper`;
    container.appendChild(itemInputWrapper);

    const cardInput = makeInput("+", "text", `${cardId}-item-input`, "item-input", "new text", itemInputWrapper, "item-input", "item-input-label");

    const itemValue = document.querySelector(`#${cardId}-item-input`);

    switchFocus(itemValue);
    itemValue.addEventListener('keydown', (event) => {
        if(event.key == "Enter"){
            createNewItem(itemValue.value, cardType, cardId);
            itemValue.value = "";
        }
    });

    const newItemBtn = document.createElement('button');
    newItemBtn.id = `${cardId}-new-item-btn`;
    itemInputWrapper.appendChild(newItemBtn);

    newItemBtn.addEventListener('click', () => {
        createNewItem(itemValue.value, cardType, cardId);
        itemValue.value = "";
    });
}

function getCardType (){
    const cardTypeTest = document.querySelector('#notes');

    let cardType = "0";
    if (cardTypeTest.checked){
        cardType = "notes";
    } else {
        cardType = "checklist";
    }
    return cardType;
}

function createNewItem (itemValue, cardType, cardId){
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

    if(cardType == "checklist"){
        const itemCheck = new makeInput("", 'checkbox', `${item.id}-checkbox`, `${item.id}-checkbox`, "", item, "item-checkbox", "");
    }

    const deleteItemBtn = document.createElement('button');
    deleteItemBtn.id = `${item.id}-delete-btn`
    deleteItemBtn.classList.add('delete-btn');
    item.appendChild(deleteItemBtn);

    const focused = document.querySelector(`#${cardId}-item-input`);
    switchFocus(focused);

    itemText.textContent = `${itemValue}`;

    const itemContainer = document.querySelector(`#${cardId}-item-container`);
    itemContainer.classList.add('item-container');
    itemContainer.appendChild(item);

        deleteItemBtn.addEventListener('click', () => {
        deleteItem(itemContainer, item); // (card, item)
    })

    const container = document.querySelector(`#${cardId}-item-container`);
    dragItem(`${cardId}-item`, container);
}
