const template = document.createElement("template");
template.innerHTML = `
<style>
div{
    height: 340px;
    width: 170px;
    border: 1px solid gray;
    padding: .5rem;
    background-color: #f4f4f4;
    overflow: scroll;
    font-size: .7rem;
    position: relative;
}
  
h2{
    font-size: 1.1rem;
    font-family: SfDistantGalaxy, sans-serif;
    letter-spacing: .67px;
    line-height: 1.2;
    margin-top: 0;
}
  
img{
    width: 100px;
}

button{
    border-radius: 1px;
    padding: 2px;
    position: absolute;
    top: 1px;
    right: 1px;
    opacity: 0.2;
}

button:hover{
    opacity: 1;
}
</style>
<div>
    <h2></h2>
    <button>X</button>
    <img alt="mugshot">
    <p id="swc-height">Height: </p>
    <p id="swc-mass">Mass: </p>
</div>
`;

class SWCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h2 = this.shadowRoot.querySelector("h2");
        this.img = this.shadowRoot.querySelector("img");
        this.p1 = this.shadowRoot.querySelector("#swc-height");
        this.p2 = this.shadowRoot.querySelector("#swc-mass");
        this.button = this.shadowRoot.querySelector("button");
    }

    connectedCallback() {
        this.button.onclick = () => this.remove();
        this.render();
    }

    disconnectedCallback() {
        this.button.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal) {
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes() {
        return ["data-name", "data-height", "data-mass", "data-image"];
    }

    render() {
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...character name...</i>";
        const height = this.getAttribute('data-height') ? this.getAttribute('data-height') : "0";
        const mass = this.getAttribute('data-mass') ? this.getAttribute('data-mass') : "0";
        const imageUrl = this.getAttribute('data-image') ? this.getAttribute('data-image') : "images/catimage-no-image.png";

        this.h2.innerHTML = `${name}`;
        this.p1.innerHTML = `${height}`;
        this.p2.innerHTML = `${mass}`;
        this.img.src = imageUrl;
    }
}

customElements.define('sw-card', SWCard);