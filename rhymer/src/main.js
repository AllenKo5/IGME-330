import { loadTextXHR, randomElement } from "./utils.js";

const appDataURL = "data/app-data.json";
let output, textarea;

// const toggleBackground = e => e.target.style.background = e.target.style.background === "black" ? "white" : "black";

const replaceWithRhyme = e => {
  const span = e.target;
  const word = span.textContent.trim();
  // const rhymes = RiTa.rhymes(word);
  // if (rhymes.length) {
  //   span.textContent = randomElement(rhymes);
  //   span.style.background = "yellow";
  // }

  // random word same pos
  const pos = RiTa.pos(word)[0];
  console.log("pos=", pos);
  if (pos.length) {
    span.textContent = RiTa.randomWord({pos: pos});
    span.style.background = "yellow";
  }
};

const createBlackoutText = () => {
  console.log("createBlackoutText() called");
  // #5 - clear out #output, that's where the blackout text will go
  output.innerHTML = "";

  // #6 - grab the value of the <textarea> and store it in a variable named `string`
  const string = textarea.value.trim();

  // #7 - turn `string` into an array of words and loop through it 
  // Here we want to turn each word into a clickable <span>
  // When a <span> is clicked on, its background color will toggle between black and white
  // Add each <span> to #output
  // Test it!
  const html = string.split(" ").map(w => `<span>${w}</span>`).join("");
  output.innerHTML = html;
  output.onclick = replaceWithRhyme;
}

const setupUI = json => {
  // #1 -  Hook up the `output` and `textarea` variables (already declared up top) to the appropriate elements
  output = document.querySelector("#output");
  textarea = document.querySelector("textarea");

  // #2 - populate the rest of the UI with loaded text
  // here we use a *descendant selector* to get a ref to the <h1> in the <header> 
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
  document.querySelector("header h1").textContent = json.title;

  // - the h2 in the header should show the .subtitle text
  // - the instructions-1 <div>
  // - the instructions-2 <div>
  // - the <textarea> should be populated with the default-text
  document.querySelector("header h2").textContent = json.subtitle;
  document.querySelector("#instructions-1").textContent = json["instructions-1"];
  document.querySelector("#instructions-2").textContent = json["instructions-2"];
  textarea.textContent = json["default-text"];

  // #3 - Hook up the button onclick to the createBlackoutText() function
  document.querySelector("#btn-create").onclick = createBlackoutText;

  // #4 - call createBlackoutText()
  createBlackoutText();
};

const appDataLoaded = e => {
  let json
  try {
    json = JSON.parse(e.target.responseText);
  } catch {
    document.querySelector("header h1").innerHTML = "BAD JSON!";
    return;
  }
  // #0 - AFTER the data has loaded, set up the UI
  setupUI(json);
};

loadTextXHR(appDataURL, appDataLoaded);