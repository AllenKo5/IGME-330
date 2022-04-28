/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData, comets;

const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "slateblue" }, { percent: 0.5, color: "lightblue" }, { percent: 1, color: "darkblue" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    // array to hold all instantiated comet objects
    comets = [];
}

const generateComet = () => {
    const c = {};
    c.radius = utils.getRandom(2, 5);
    c.x = utils.getRandom(100, canvasWidth + 400);
    c.y = -100;
    c.speed = utils.getRandom(1, 5);

    // draws comet at its x and y position
    c.draw = (ctx) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = "skyblue";
        ctx.fill();
        ctx.restore();
    }

    // moves comet based off its speed
    c.move = () => {
        c.x -= c.speed;
        c.y += c.speed;
    }

    // push to array
    comets.push(c);
}

const draw = (params = {}) => {
    // populate the audioData array with the frequency data from the analyserNode
    analyserNode.getByteFrequencyData(audioData);

    let radius = canvasHeight / 4;

    // draw background
    ctx.save();
    if (params.showTrails) {
        ctx.globalAlpha = 0.2;
    }
    ctx.fillStyle = "midnightblue";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 4 * canvasHeight / 5, canvasWidth, canvasHeight / 5);
    ctx.restore();

    // draw comets
    if (params.showComets) {
        let total = 0;
        for (let i = 0; i < audioData.length / 4; i++) {
            total += audioData[i];
        }
        if (total > 6000) {
            generateComet();
        }

        ctx.save();
        // loop through all comets
        for (let i = 0; i < comets.length; i++) {
            comets[i].move();
            comets[i].draw(ctx);

            // remove any comets that have hit the ground
            if (comets[i].y >= 4 * canvasHeight / 5) {
                // draw impacts if enabled
                if (params.showImpacts) {
                    ctx.save();
                    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                    ctx.fillRect(comets[i].x, 0, comets[i].radius, canvasHeight);
                    ctx.restore();
                }

                comets.splice(i, 1);
                i--;
            }
        }
        ctx.restore();
    }

    // draw bars
    if (params.showBars) {
        const perimeter = 2 * Math.PI * radius;
        const barWidth = perimeter / audioData.length;

        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "lightblue";
        // loop through the data and draw
        for (let i = 0; i < audioData.length; i++) {
            const percent = audioData[i] / 255;
            ctx.save();
            ctx.translate(canvasWidth / 2, canvasHeight / 3);
            ctx.rotate(i * Math.PI * 2 / audioData.length);
            ctx.fillRect(0, -radius * 0.75, -barWidth, -percent * radius);
            ctx.restore();
        }
        ctx.restore();
    }

    // draw circles
    if (params.showCircles) {
        ctx.save();
        for (let i = 0; i < audioData.length; i++) {
            const percent = audioData[i] / 255;
            const circleRadius = percent * radius;

            // dark blue circles
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 128, 0.34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius * 1.3, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // light blue circles, bigger, more transparent
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 128, 255, 0.10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius * 1.6, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // blue circles, smaller
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 255, 0.5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore();
    }

    // bitmap manipulation
    if (params.showMonochrome) {
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let data = imageData.data;
        let length = data.length;
        for (let i = 0; i < length; i += 4) {
            if (params.showMonochrome) {
                const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = gray;
            }
        }

        // copy image data back to canvas
        ctx.putImageData(imageData, 0, 0);
    }
}

export { setupCanvas, draw };