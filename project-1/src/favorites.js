import "./main.js";
import "./favorite-card.js";
import * as storage from "./localStorage.js";

const favorites = document.querySelector("#favorites");

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

const showFavorites = () => {
    favorites.innerHTML = "";
    const cards = storage.getFavorites();
    let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=";

    if (cards.length === 0) {
        favorites.innerHTML = "There are currently no favorites!";
        return;
    }

    for (let i = 0; i < cards.length; i += 1) {
        if (i === cards.length - 1) {
            url += `${cards[i]}`;
        } else {
            url += `${cards[i]}|`;
        }
    }
    
    console.log(url);

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
        for (let i = 0; i < json.data.length; i += 1) {
            showCard(json.data[i]);
        }
    };

    fetchPromise().catch((e) => {
        console.log(`In catch with e = ${e}`);
    });
}

const init = () => {
    showFavorites();
    document.querySelector("#clear-favorites").onclick = () => {
        storage.clearFavorites();
        showFavorites();
    };
}

init();