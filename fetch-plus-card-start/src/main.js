import * as ajax from "./ajax.js";
import SWCharacter from "./SWCharacter.js";
import "./sw-card.js";

const url = "https://swapi.dev/api/people/5";
const searchButton = document.querySelector("#search-button");
const cardHolder = document.querySelector("#card-holder");

const addToFavorites = (swCharacter) => console.log("addTOFavorites in main.js ", swCharacter);

const dataLoaded = (json) => {
  // console.log(json);
  // console.log(json.name);
  // console.log(json.hair_color);
  // console.log(json.eye_color);
  // const string = `
  //   <h2>${json.name}</h2>
  //   <p>Hair color: ${json.hair_color}, eye color: ${json.eye_color}</p>
  // `;
  // cardHolder.innerHTML = string;

  const character = new SWCharacter(json.name, json.hair_color, json.eye_color);
  console.log(character);
  const card = document.createElement("sw-card");
  card.character = character;
  card.callback = addToFavorites;
  cardHolder.appendChild(card);
};

searchButton.onclick = () => ajax.loadJsonFetch(url, dataLoaded);