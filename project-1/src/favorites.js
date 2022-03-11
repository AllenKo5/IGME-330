import "./main.js";
import "./favorite-card.js";
import { loadFile } from "./utils.js";
import * as storage from "./localStorage.js";

let currentPage = 0;
const favorites = document.querySelector("#favorites"),
    clearFavoriteButton = document.querySelector("#clear-favorites"),
    prevButton = document.querySelector("#previous-button"),
    nextButton = document.querySelector("#next-button");

// Creates card with specified dataset
const showCard = (cardInfo) => {
    const favoriteCard = document.createElement("favorite-card");

    favoriteCard.dataset.name = cardInfo.name ?? "no name found";
    favoriteCard.dataset.level = cardInfo.level ?? "";
    favoriteCard.dataset.attribute = cardInfo.attribute ?? "";
    favoriteCard.dataset.race = cardInfo.race ?? "";
    favoriteCard.dataset.type = cardInfo.type ?? "";
    favoriteCard.dataset.atk = cardInfo.atk ?? "";
    favoriteCard.dataset.def = cardInfo.def ?? "";
    favoriteCard.dataset.desc = cardInfo.desc ?? "";
    favoriteCard.dataset.image = cardInfo.card_images[0].image_url ?? "";

    favorites.appendChild(favoriteCard);
};

// Function for adding cards
const addCards = json => {
    // Sorts image urls by id
    for (let j of json.data) {
        j.card_images.sort((a, b) => {
            return a.id - b.id;
        });
    }

    console.log(json);
    // Call showcard for each card within the filtered results
    for (let i = currentPage * 10; i < json.data.length && i < (currentPage * 10) + 10; i += 1) {
        showCard(json.data[i]);
    }
}

// Displays all favorited cards
const showFavorites = () => {
    favorites.innerHTML = "";
    const cards = storage.getFavorites();
    let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=";

    if (cards.length === 0) {
        prevButton.disabled = true;
        nextButton.disabled = true;
        favorites.innerHTML = "There are currently no favorites!";
        return;
    } else if (cards.length < 10) {
        prevButton.disabled = true;
        nextButton.disabled = true;
    } else if (currentPage === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
    } else if (currentPage === Math.floor(cards.length / 10)) {
        prevButton.disabled = false;
        nextButton.disabled = true;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }

    for (let i = 0; i < cards.length; i += 1) {
        if (i === cards.length - 1) {
            url += `${cards[i]}`;
        } else {
            url += `${cards[i]}|`;
        }
    }

    console.log(url);
    loadFile(url, addCards, () => { return; });
}

// Initialize statement
const init = () => {
    showFavorites();
    clearFavoriteButton.onclick = () => {
        storage.clearFavorites();
        showFavorites();
    };
    prevButton.onclick = () => {
        currentPage -= 1;
        showFavorites();
    }
    nextButton.onclick = () => {
        currentPage += 1;
        showFavorites();
    }
}

init();