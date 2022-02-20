
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
div{
    white-space: pre-line;
    width: 20rem;
    border-radius: 1rem;
    margin: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: #f4f4f4;
    font-size: 0.7rem;
    position: relative;
}
</style>
<div>
    <h1 class="subtitle my-0"></h1>
    <img alt="card">
    <h2 class="is-size-6"></h2>
    <p class="is-size-7"><p>
</div>
`;

class FavoriteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h1 = this.shadowRoot.querySelector("h1");
        this.img = this.shadowRoot.querySelector("img");
        this.h2 = this.shadowRoot.querySelector("h2");
        this.p = this.shadowRoot.querySelector("p");
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute("data-name") ? this.getAttribute("data-name") : "";
        const level = this.getAttribute("data-level") ? `Level ${this.getAttribute("data-level")}` : "";
        const attribute = this.getAttribute("data-attribute") ? this.getAttribute("data-attribute") : "";
        const race = this.getAttribute("data-race") ? this.getAttribute("data-race") : "";
        const type = this.getAttribute("data-type") ? this.getAttribute("data-type") : "";
        const atk = this.getAttribute("data-atk") ? `ATK ${this.getAttribute("data-atk")}` : "";
        const def = this.getAttribute("data-def") ? `DEF ${this.getAttribute("data-def")}<br>` : "";
        const desc = this.getAttribute("data-desc") ? this.getAttribute("data-desc") : "";
        const imgUrl = this.getAttribute("data-image") ? this.getAttribute("data-image") : "";

        this.h1.innerHTML = `${name}`;
        this.img.src = imgUrl;
        this.h2.innerHTML = `${level} ${attribute} ${race} ${type}`;
        this.p.innerHTML = `${atk} ${def} ${desc}`;
    }
}

customElements.define('favorite-card', FavoriteCard);