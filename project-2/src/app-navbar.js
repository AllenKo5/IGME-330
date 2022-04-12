const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
:host {
    user-select: none;
} 
</style>
<nav class="navbar has-shadow is-link">
    <div class="navbar-brand">
        <a class="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>

    <div class="navbar-menu" id="nav-links">
        <div class="navbar-start">
            <a id="about" class="navbar-item is-hoverable" href="about.html">
                About
            </a>

            <a id="app" class="navbar-item is-hoverable" href="app.html">
                App
            </a>

            <a id="documentation" class="navbar-item is-hoverable" href="documentation.html">
                Documentation
            </a>
        </div> <!-- end navbar-start -->
    </div>
</nav>
`;

class AppNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // for mobile menu
        this.burgerIcon = this.shadowRoot.querySelector("#burger");
        this.navbarMenu = this.shadowRoot.querySelector("#nav-links");
        this.shadowRoot.querySelector(`#${this.dataset.currentpage || "home"}`).className = "navbar-item is-active";

        this.burgerIcon.onclick = () => {
            this.navbarMenu.classList.toggle("is-active");
        };
    }
}

customElements.define('app-navbar', AppNavbar);