let words1, words2, words3;

loadTextXHR();

// loads text from csv file
function loadTextXHR() {
    const url = "data/babble-data.csv";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        const text = e.target.responseText;
        const lines = text.split("\n");
        words1 = lines[0].split(",");
        words2 = lines[1].split(",");
        words3 = lines[2].split(",");
    };
    xhr.open("GET", url);
    xhr.send();
    init();
}

// initialize function, applies onclick events to each button
function init() {
    window.onload = () => generatePhrase(1);
    document.querySelector("#single-button").onclick = () => generatePhrase(1);
    document.querySelector("#multi-button").onclick = () => generatePhrase(5);
}

// returns a random element of the given array
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// generates a number of phrases line by line based on num
function generatePhrase(num) {
    let fullPhrase = ``;
    for (let i = 0; i < num; ++i) {
        fullPhrase += `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}<br>`;
    }
    document.querySelector("#output").innerHTML = fullPhrase;
}