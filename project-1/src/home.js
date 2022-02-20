import "./main.js";

const randomCard = document.querySelector("#random-card");

const init = () => {
    randomCard.innerHTML = "";

    const fetchPromise = async () => {
        const response = await fetch("https://db.ygoprodeck.com/api/v7/randomcard.php");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();

        // Sorts image urls by id
        json.card_images.sort((a, b) => {
            return a.id - b.id;
        });

        // Displays image of random card
        const randomImage = document.createElement("img");
        randomImage.src = json.card_images[0].image_url;
        randomImage.alt = json.name;
        randomCard.appendChild(randomImage);
    };

    fetchPromise().catch((e) => {
        console.log(`In catch with e = ${e}`);
    });
};

init();