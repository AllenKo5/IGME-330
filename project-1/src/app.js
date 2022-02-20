import "./main.js";
import * as storage from "./localStorage.js";

const cardName = document.querySelector("#card-name"),
    cardType = document.querySelector("#card-type"),
    subType = document.querySelector("#sub-type"),
    cardRace = document.querySelector("#card-race"),
    cardAttribute = document.querySelector("#card-attribute"),
    cardLevel = document.querySelector("#card-level"),
    cardAtk = document.querySelector("#card-atk"),
    cardDef = document.querySelector("#card-def"),
    maxResults = document.querySelector("#max-results"),
    searchButton = document.querySelector("#search-button"),
    clearButton = document.querySelector("#clear-button"),
    content = document.querySelector("#content");

const addSubType = () => {
    switch (cardType.value) {
        case "monster":
            subType.innerHTML = `
            <option value="none"></option>
            <option value="normal monster,normal tuner monster,pendulum normal monster">Normal Monster</option>
            <option value="effect monster,flip effect monster,tuner monster,flip tuner effect monster,pendulum effect monster,pendulum flip effect monster,pendulum tuner effect monster,spirit monster,toon monster,gemini monster">Effect Monster</option>
            <option value="ritual monster,ritual effect monster">Ritual Monster</option>
            <option value="fusion monster,pendulum effect fusion monster">Fusion Monster</option>
            <option value="synchro monster,synchro pendulum effect monster">Synchro Monster</option>
            <option value="xyz monster,xyz pendulum effect monster">Xyz Monster</option>
            <option value="pendulum effect monster,pendulum flip effect monster,pendulum normal monster,pendulum tuner effect monster,pendulum effect fusion monster,synchro pendulum effect monster,xyz pendulum effect monster">Pendulum Monster</option>
            <option value="link monster">Link Monster</option>
            `;
            subType.disabled = false;
            cardRace.innerHTML = `
            <option value="none"></option>
            <option value="aqua">Aqua</option>
            <option value="beast">Beast</option>
            <option value="beast-warrior">Beast-Warrior</option>
            <option value="creator-god">Creator-God</option>
            <option value="cyberse">Cyberse</option>
            <option value="dinosaur">Dinosaur</option>
            <option value="divine-beast">Divine Beast</option>
            <option value="dragon">Dragon</option>
            <option value="fairy">Fairy</option>
            <option value="fish">Fish</option>
            <option value="insect">Insect</option>
            <option value="machine">Machine</option>
            <option value="plant">Plant</option>
            <option value="psychic">Psychic</option>
            <option value="pyro">Pyro</option>
            <option value="reptile">Reptile</option>
            <option value="rock">Rock</option>
            <option value="sea serpent">Sea Serpent</option>
            <option value="spellcaster">Spellcaster</option>
            <option value="thunder">Thunder</option>
            <option value="warrior">Warrior</option>
            <option value="winged beast">Winged Beast</option>
            `;
            cardRace.disabled = false;
            cardAttribute.innerHTML = `
            <option value="none"></option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="wind">Wind</option>
            <option value="earth">Earth</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="divine">Divine</option>
            `;
            cardAttribute.disabled = false;
            cardLevel.innerHTML = `
            <option value="none"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            `;
            cardLevel.disabled = false;
            cardAtk.disabled = false;
            cardDef.disabled = false;
            break;
        case "spell card":
            subType.innerHTML = "";
            subType.disabled = true;
            cardRace.innerHTML = `
            <option value="none"></option>
            <option value="normal">Normal</option>
            <option value="field">Field</option>
            <option value="equip">Equip</option>
            <option value="continuous">Continuous</option>
            <option value="quick-play">Quick-Play</option>
            <option value="ritual">Ritual</option>
            `;
            cardRace.disabled = false;
            cardAttribute.disabled = true;
            cardLevel.disabled = true;
            cardAtk.disabled = true;
            cardDef.disabled = true;
            break;
        case "trap card":
            subType.innerHTML = "";
            subType.disabled = true;
            cardRace.innerHTML = `
            <option value="none"></option>
            <option value="normal">Normal</option>
            <option value="continuous">Continuous</option>
            <option value="counter">Counter</option>
            `;
            cardRace.disabled = false;
            cardAttribute.disabled = true;
            cardLevel.disabled = true;
            cardAtk.disabled = true;
            cardDef.disabled = true;
            break;
        default:
            subType.innerHTML = "";
            subType.disabled = true;
            cardRace.disabled = true;
            cardAttribute.disabled = true;
            cardLevel.disabled = true;
            cardAtk.disabled = true;
            cardDef.disabled = true;
            break;
    }
};

// Creates card with specified dataset
const showCard = (cardInfo) => {
    const ygoCard = document.createElement("ygo-card");

    ygoCard.dataset.name = cardInfo.name ?? "no name found";
    ygoCard.dataset.level = cardInfo.level ?? "";
    ygoCard.dataset.attribute = cardInfo.attribute ?? "";
    ygoCard.dataset.race = cardInfo.race ?? "";
    ygoCard.dataset.type = cardInfo.type ?? "";
    ygoCard.dataset.atk = cardInfo.atk ?? "";
    ygoCard.dataset.def = cardInfo.def ?? "";
    ygoCard.dataset.desc = cardInfo.desc ?? "";
    ygoCard.dataset.image = cardInfo.card_images[0].image_url ?? "";

    content.appendChild(ygoCard);
};

// Displays cards when search button is clicked
const searchButtonClicked = () => {
    const YGOPRO_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?";
    let url = YGOPRO_URL;

    // Clear all current results
    content.innerHTML = "";

    // Reading in parameters
    let term = "";

    if (cardName.value) {
        term = cardName.value.trim();
        term = encodeURIComponent(term);
    }
    url += `fname=${term}`;
    if (cardType.value !== "none") {
        if (cardType.value === "monster") {
            if (subType.value !== "none") {
                url += `&type=${encodeURIComponent(subType.value.trim())}`;
            } else {
                url += encodeURIComponent("&type=normal monster,normal tuner monster,pendulum normal monster,effect monster,flip effect monster,tuner monster,flip tuner effect monster,pendulum effect monster,pendulum flip effect monster,pendulum tuner effect monster,spirit monster,toon monster,gemini monster,ritual monster,ritual effect monster,fusion monster,synchro monster,xyz monster,link monster,pendulum effect fusion monster,synchro pendulum effect monster,xyz pendulum effect monster".trim());
            }
        } else {
            url += `&type=${encodeURIComponent(cardType.value.trim())}`;
        }
    }
    if (cardRace.value !== "none") {
        url += `&race=${cardRace.value}`;
    }
    if (cardAttribute.value !== "none") {
        url += `&attribute=${cardAttribute.value}`;
    }
    if (cardLevel.value !== "none") {
        url += `&level=${cardLevel.value}`;
    }
    if (!isNaN(cardAtk.value) && !isNaN(parseFloat(cardAtk.value))) {
        url += `&atk=${cardAtk.value}`;
    }
    if (!isNaN(cardDef.value) && !isNaN(parseFloat(cardDef.value))) {
        url += `&def=${cardDef.value}`;
    }

    console.log(url);

    // Get JSON from API using fetch
    const fetchPromise = async () => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();

        // Sorts image urls by id
        for (let j of json.data) {
            j.card_images.sort((a, b) => {
                return a.id - b.id;
            });
        }

        console.log(json);
        // Call showcard for each card within the filtered results
        for (let i = 0; i < json.data.length && i < maxResults.value; i += 1) {
            showCard(json.data[i]);
        }
    };

    fetchPromise().catch((e) => {
        console.log(`In catch with e = ${e}`);
        content.innerHTML = "No results found!";
    });
};

cardType.onchange = addSubType;
searchButton.onclick = searchButtonClicked;
clearButton.onclick = () => {
    content.innerHTML = "";
};