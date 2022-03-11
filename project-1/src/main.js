import "./app-header.js";
import "./app-footer.js";
import "./ygo-card.js";
import "./app-navbar.js";

document.querySelector("#top-button").onclick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}