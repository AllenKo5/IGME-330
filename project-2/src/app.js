/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import "./main.js";
import * as utils from './utils.js';
import * as audio from './audio.js';
import * as visualizer from './visualizer.js';

const drawParams = {
    showBars: true,
    showCircles: true,
    showComets: false,
    showNoise: false,
    showInvert: false,
    showEmboss: false
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/Stellar Stellar.mp3"
});

function init() {
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
}

function setupUI(canvasElement) {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fs-button");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("init called");
        utils.goFullscreen(canvasElement);
    };

    // B - hookup play/pause button
    const playButton = document.querySelector("#play-button");

    // add .onclick event to button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }
        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if (e.target.dataset.playing == "no") {
            // if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; // our CSS will set the text to "Pause"
            // if track IS playing, pause it
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; // our CSS will set the text to "Play"
        }
    };

    // C - hookup volume slider & label
    let volumeSlider = document.querySelector("#volume-slider");
    let volumeLabel = document.querySelector("#volume-label");

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        // set the gain
        audio.setVolume(e.target.value);
        // update value of label to match value of slider
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    }

    // set value of label to match initial value of slider
    volumeSlider.dispatchEvent(new Event("input"));

    // D - hookup track <select>
    let trackSelect = document.querySelector("#track-select");
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        // pause the current track if it is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };

    // checkboxes
    document.querySelector("#circles-checkbox").onchange = e => {
        drawParams.showCircles = e.target.checked;
    }
    document.querySelector("#bars-checkbox").onchange = e => {
        drawParams.showBars = e.target.checked;
    }
    document.querySelector("#comets-checkbox").onchange = e => {
        drawParams.showComets = e.target.checked;
    }

    visualizer.setupCanvas(canvasElement, audio.analyserNode);
    loop();
} // end setupUI

function loop() {
    requestAnimationFrame(loop);
    visualizer.draw(drawParams);
}

init();