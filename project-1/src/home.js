import "./main.js";
import {loadFile} from "./utils.js";

const randomCard = document.querySelector("#random-card");

const displayCard = json => {
    // Sorts image urls by id
    json.card_images.sort((a, b) => {
        return a.id - b.id;
    });

    // Displays image of random card
    const randomImage = document.createElement("img");
    randomImage.src = json.card_images[0].image_url;
    randomImage.alt = json.name;
    randomCard.appendChild(randomImage);
}

const errorMessage = () => {
    randomCard.innerHTML = "Unable to get card from database!";
}

const init = () => {
    randomCard.innerHTML = "";

    const randomUrl = "https://db.ygoprodeck.com/api/v7/randomcard.php";
    loadFile(randomUrl, displayCard, errorMessage);
};

init();