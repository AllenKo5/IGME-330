const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
header {
    user-select: none;
}
</style>
<header class="hero is-small is-primary is-bold">
    <div class="hero-body">
      <div class="container">
            <h1 class="title">Greeter</h1>
            <h2 class="subtitle">Web Components Version</h2>
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