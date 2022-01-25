import { randomElement } from "./utils.js";

let words1, words2, words3;

loadJsonXHR();

// loads text from json file
function loadJsonXHR() {
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        let json;
        try {
            json = JSON.parse(e.target.responseText);
        } catch {
            document.querySelector("#output").innerHTML = "BAD JSON!";
            return;
        }

        words1 = json["words1"];
        words2 = json["words2"];
        words3 = json["words3"];

        generatePhrase(1);
        document.querySelector("#single-button").onclick = () => generatePhrase(1);
        document.querySelector("#multi-button").onclick = () => generatePhrase(5);
    };
    xhr.open("GET", url);
    xhr.send();
}

// generates a number of phrases line by line based on num
function generatePhrase(num) {
    let fullPhrase = ``;
    for (let i = 0; i < num; ++i) {
        fullPhrase += `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}<br>`;
    }
    document.querySelector("#output").innerHTML = fullPhrase;
}