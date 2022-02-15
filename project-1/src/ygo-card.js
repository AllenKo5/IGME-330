const template = document.createElement("template");
template.innerHTML = `
<div>
    <h2></h2>
    <button>X</button>
    <img alt="card">
</div>
`;

class YGOCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.img = this.shadowRoot.querySelector("img");
    }
}

customElements.define('ygo-card', YGOCard);