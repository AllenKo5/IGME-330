import { loadTextXHR, displayTaffy, displayViking } from "./utils.js";

document.querySelector("#button-1").onclick = () => loadTextXHR("data/taffy-facts.txt", displayTaffy);
document.querySelector("#button-2").onclick = () => loadTextXHR("data/viking-facts.txt", displayViking);