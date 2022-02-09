const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
    user-select: none;
</style>
<header class="hero is-small is-info is-bold">
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title">Yu-Gi-Oh! Card Finder</h1>
        </div>
    </div>
</header>
`;

class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('app-header', AppHeader);