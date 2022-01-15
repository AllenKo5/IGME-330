'use strict';

// 1 - get a reference to the button
// 2 - add a click event to button that calls a `sayHello` function
// 3 - create a `sayHello()` function
// 3A - get name of person from the <input>
// 3B - get a reference to the #output <p>
// 3C - update HTML of #output <p>

const helloButton = document.querySelector("#hello-button");
const goodbyeButton = document.querySelector("#goodbye-button");
helloButton.onclick = () => greet("Hello");
goodbyeButton.onclick = () => greet("Goodbye");
function greet(greeting) {
    let firstName = document.querySelector("#input-firstname").value.trim();
    let lastName = document.querySelector("#input-lastname").value.trim();
    if (!firstName) {
        firstName = "John";
    }
    if (!lastName) {
        lastName = "Doe";
    }
    document.querySelector("#output").innerHTML = `${greeting} ${firstName} ${lastName}!`;
}