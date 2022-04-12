const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
:host {
    user-select: none;
}
</style>
<footer class="footer is-info">
    <div class="content has-text-centered">
        <slot></slot>
    </div>
</footer>
`;

class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('app-footer', AppFooter);