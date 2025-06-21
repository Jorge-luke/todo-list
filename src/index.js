import "./styles.css";
import { createDOM } from "./create-dom";

createDOM();




//  Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created

//  And another function that looks for that data in localStorage when your app is first loaded.





// Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!

// You can inspect data you saved in localStorage using DevTools! To do this, open the Application tab 
// in DevTools and click on the Local Storage tab under Storage. Every time you add, update and
//  delete data from localStorage in your app, those changes will be reflected in DevTools.

// localStorage uses JSON to send and store data, and when you retrieve the data, it will also be in JSON 
// format. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods 
// back to your object properties once you fetch them. Good luck!