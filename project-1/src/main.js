import "./app-header.js";
import "./app-footer.js";
import "./ygo-card.js";

// mobile menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.onclick = () => {
    navbarMenu.classList.toggle("is-active");
}
