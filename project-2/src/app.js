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

let circlesCB, barsCB, cometsCB, trailsCB, impactsCB, monochromeCB;
const drawParams = {};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/Stellar Stellar.mp3"
});

function init() {
    console.log("init called");
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element

    // async fetch from presets.json
    const fetchPromise = async () => {
        let response = await fetch("data/presets.json");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let json = await response.json();
        const keys = Object.keys(json);
        for (let k of keys) {
            const obj = json[k];
            drawParams[obj.name] = obj.state;
            document.querySelector(obj.id).checked = obj.state;
        }
    };

    fetchPromise()
    .catch(e => {
        console.log(`In catch with e = ${e}`);
    });	
    
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
    circlesCB = document.querySelector("#circles-checkbox");
    barsCB = document.querySelector("#bars-checkbox");
    cometsCB = document.querySelector("#comets-checkbox");
    trailsCB = document.querySelector("#trails-checkbox");
    impactsCB = document.querySelector("#impacts-checkbox");
    monochromeCB = document.querySelector("#monochrome-checkbox");

    circlesCB.onchange = e => {
        drawParams.showCircles = e.target.checked;
    }
    barsCB.onchange = e => {
        drawParams.showBars = e.target.checked;
    }
    cometsCB.onchange = e => {
        drawParams.showComets = e.target.checked;
    }
    trailsCB.onchange = e => {
        drawParams.showTrails = e.target.checked;
    }
    impactsCB.onchange = e => {
        drawParams.showImpacts = e.target.checked;
    }
    monochromeCB.onchange = e => {
        drawParams.showMonochrome = e.target.checked;
    }

    visualizer.setupCanvas(canvasElement, audio.analyserNode);
    loop();
} // end setupUI

function loop() {
    // update comet-reliant checkboxes
    trailsCB.disabled = !cometsCB.checked;
    impactsCB.disabled = !cometsCB.checked;
    if (!cometsCB.checked) {
        trailsCB.checked = false;
        impactsCB.checked = false;
    }

    requestAnimationFrame(loop);
    visualizer.draw(drawParams);
}

init();