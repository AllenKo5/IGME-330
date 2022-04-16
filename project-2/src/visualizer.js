/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';

let ctx, canvasWidth, canvasHeight, analyserNode, audioData, comets;

const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    comets = [];
}

const generateComet = () => {
    const c = {};
    c.radius = Math.random() * 10;
    c.x = Math.random() * canvasWidth + 100;
    c.y = Math.random() * -100;

    c.draw = (ctx) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = "skyblue";
        ctx.fill();
        ctx.restore();
    }

    c.move = () => {
        const speed = Math.random() * 5;
        c.x -= speed;
        c.y += speed;
    }

    comets.push(c);
}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    analyserNode.getByteFrequencyData(audioData);
    // OR
    // analyserNode.getByteTimeDomainData(audioData); // waveform data

    let radius = canvasHeight / 4;

    // 2 - draw background
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "midnightblue";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "darkslateblue";
    ctx.fillRect(0, 2 * canvasHeight / 3, canvasWidth, canvasHeight / 3);
    ctx.fillStyle = "cornflowerblue";
    ctx.fillRect(0, 5 * canvasHeight / 6, canvasWidth, canvasHeight / 6);
    ctx.restore();

    // draw comets
    if (params.showComets) {
        console.log(audioData[0]);
        ctx.save();

        // loop through all comets
        for (let i = 0; i < comets.length; i++) {
            comets[i].move();
            comets[i].draw(ctx);

            // remove any comets that have left the screen
            if (comets[i].x < -100 || comets[i].y > canvasHeight + 100) {
                comets.splice(i, i + 1);
                i--;
            }
        }
        ctx.restore();
    }

    // draw circles
    if (params.showCircles) {
        ctx.save();
        ctx.globalAlpha = 0.5;

        ctx.beginPath();
        ctx.fillStyle = "mediumblue";
        ctx.arc(canvasWidth / 2, canvasHeight / 3, radius * 0.75, 0, 3 * Math.PI, false);
        ctx.closePath();
        ctx.fill();

        for (let i = 0; i < audioData.length; i++) {
            const percent = audioData[i] / 255;
            const circleRadius = percent * radius;

            // dark blue circles
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 128, 0.34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius * 0.67, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // light blue circles, bigger, more transparent
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 128, 255, 0.10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // blue circles, smaller
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 255, 0.5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius * 0.33, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore();
    }

    // draw bars
    if (params.showBars) {
        const perimeter = 2 * Math.PI * radius;
        const barWidth = perimeter / audioData.length;

        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
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

    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary
    if (params.showNoise || params.showInvert || params.showEmboss) {
        // A) grab all of the pixels on the canvas and put them in the `data` array
        // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
        // the variable `data` below is a reference to that array 
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let data = imageData.data;
        let length = data.length;
        let width = imageData.width; // not using here
        // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
        for (let i = 0; i < length; i += 4) {
            // C) randomly change every 20th pixel to red
            if (params.showNoise && Math.random() < 0.05) {
                // data[i] is the red channel
                // data[i+1] is the green channel
                // data[i+2] is the blue channel
                // data[i+3] is the alpha channel
                data[i] = data[i + 1] = data[i + 2] = 255; // zero out the red and green and blue channels
            } // end if

            if (params.showInvert) {
                let red = data[i], green = data[i + 1], blue = data[i + 2];
                data[i] = 255 - red;
                data[i + 1] = 255 - green;
                data[i + 2] = 255 - blue;
            }
        } // end for

        if (params.showEmboss) {
            for (let i = 0; i < length; i++) {
                if (i % 4 == 3) continue;
                data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
            }
        }

        // D) copy image data back to canvas
        ctx.putImageData(imageData, 0, 0);
    }
}

export { setupCanvas, draw };