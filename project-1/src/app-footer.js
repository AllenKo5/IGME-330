const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
    user-select: none;
</style>
<footer class="footer is-info">
    <div class="content has-text-centered">
        Yu-Gi-Oh! Card Finder by <strong>Allen Ko</strong><br>
        Powered by <a href="https://db.ygoprodeck.com/api-guide/">YGOPRODeck</a>, a Yu-Gi-Oh! card database and deck-sharing site
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