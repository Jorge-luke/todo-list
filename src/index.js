import "./styles.css";
console.log("index.js Test")


const container = document.querySelector('#container');

const nav = document.createElement('nav');
nav.id = "nav";
container.appendChild(nav);

const navTop = document.createElement('div');
navTop.id = 'nav-top';
nav.appendChild(navTop);

const topText = document.createElement('div');
topText.id = 'top-text';
topText.textContent = "Projects:"
navTop.appendChild(topText);

const navBottom = document.createElement('div');
navBottom.id = 'nav-bottom';
nav.appendChild(navBottom);

const defaultBtn = document.createElement('button');
defaultBtn.id = 'default-btn';
defaultBtn.textContent = "Project";
navBottom.appendChild(defaultBtn);

const content = document.createElement('div');
content.id = 'content';
container.appendChild(content);

import { project } from "./project.js";
project();




