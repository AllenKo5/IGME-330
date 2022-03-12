import "./main.js";
import "./community-card.js";
import { loadFile } from "./utils.js";
import * as firebase from "./firebase.js";

let currentPage = 0,
    url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=",
    cards = [];
const communityFavorites = document.querySelector("#community-favorites"),
    prevButton = document.querySelector("#previous-button"),
    nextButton = document.querySelector("#next-button");

// Creates card with specified dataset
const showCard = cardInfo => {
    const communityCard = document.createElement("community-card");

    communityCard.dataset.name = cardInfo.name ?? "no name found";
    communityCard.dataset.level = cardInfo.level ?? "";
    communityCard.dataset.attribute = cardInfo.attribute ?? "";
    communityCard.dataset.race = cardInfo.race ?? "";
    communityCard.dataset.type = cardInfo.type ?? "";
    communityCard.dataset.atk = cardInfo.atk ?? "";
    communityCard.dataset.def = cardInfo.def ?? "";
    communityCard.dataset.desc = cardInfo.desc ?? "";
    communityCard.dataset.image = cardInfo.card_images[0].image_url ?? "";
    communityCard.dataset.likes = cards.find(card => card.name === cardInfo.name).likes;

    communityFavorites.appendChild(communityCard);
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
const showCommunityFavorites = () => {
    communityFavorites.innerHTML = "";
    
    if (cards.length === 0) {
        prevButton.disabled = true;
        nextButton.disabled = true;
        communityFavorites.innerHTML = "There are currently no favorites!";
        return;
    } else if (cards.length <= 10) {
        prevButton.disabled = true;
        nextButton.disabled = true;
    } else if (currentPage === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
    } else if (currentPage === Math.floor(cards.length / 10) || currentPage + 1 === cards.length / 10) {
        prevButton.disabled = false;
        nextButton.disabled = true;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }

    loadFile(url, addCards, () => { return; });
}

const cardRef = firebase.ref(firebase.db, firebase.likedCardsPath);

const cardsChanged = (snapshot) => {
    communityFavorites.innerHTML = "";
    snapshot.forEach(card => {
        const childData = card.val();
        if (childData.likes !== 0) {
            url += `${childData.card}|`;
            const newCard = {
                name: childData.card,
                likes: childData.likes
            }
            cards.push(newCard);
        }
    });
    url = url.slice(0, -1);
    showCommunityFavorites();
};

// Initialize statement
const init = () => {
    firebase.onValue(cardRef, cardsChanged);

    prevButton.onclick = () => {
        currentPage -= 1;
        showCommunityFavorites();
    };
    nextButton.onclick = () => {
        currentPage += 1;
        showCommunityFavorites();
    };
}

init();