function loadTextXHR(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

function displayTaffy(e) {
    const html = e.target.responseText;
    document.querySelector("#output-1").innerHTML = html;
}

function displayViking(e) {
    const html = e.target.responseText;
    document.querySelector("#output-2").innerHTML = html;
}

export { loadTextXHR, displayTaffy, displayViking };