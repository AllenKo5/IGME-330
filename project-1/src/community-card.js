const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
div{
    white-space: pre-line;
    width: 275px;
    height: 550px;
    border-radius: 1rem;
    margin: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: #f4f4f4;
    overflow: scroll;
    position: relative;
}
h2{
    font-size: 1.2rem;
}
img{
    width: 90%;
}
@media only screen and (min-width: 768px){
    div{
        width: 250px;
        height: 500px;
    }
}
@media only screen and (min-width: 1024px){
    div{
        width: 350px;
        height: 700px;
    }
}
</style>
<div>
    <h1 class="title mt-1 mb-0"></h1>
    <img alt="card">
    <h2></h2>
    <p id="text"></p>
    <p id="likes"></p>
</div>
`;

class CommunityCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.button = this.shadowRoot.querySelector("button");
        this.h1 = this.shadowRoot.querySelector("h1");
        this.img = this.shadowRoot.querySelector("img");
        this.h2 = this.shadowRoot.querySelector("h2");
        this.p1 = this.shadowRoot.querySelector("#text");
        this.p2 = this.shadowRoot.querySelector("#likes");

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
        this.img.alt = name;
        this.h2.innerHTML = `${level} ${attribute} ${race} ${type}`;
        this.p1.innerHTML = `${atk} ${def} ${desc}`;
    }
}

customElements.define('community-card', CommunityCard);