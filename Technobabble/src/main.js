let words1, words2, words3;

loadXmlXHR();

// loads text from xml file
function loadXmlXHR() {
    const url = "data/babble-data.xml";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        const xml = e.target.responseXML;

        if (!xml) {
            document.querySelector("#output").innerHTML = "xml is null!";
            return;
        }

        words1 = xml.querySelector("namelist[cid='words1']").textContent.split(",");
        words2 = xml.querySelector("namelist[cid='words2']").textContent.split(",");
        words3 = xml.querySelector("namelist[cid='words3']").textContent.split(",");

        generatePhrase(1);
        document.querySelector("#single-button").onclick = () => generatePhrase(1);
        document.querySelector("#multi-button").onclick = () => generatePhrase(5);
    };
    xhr.open("GET", url);
    xhr.send();
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