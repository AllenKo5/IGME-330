"use strict";

const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];

const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];

const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];

init();

// initialize function, applies onclick events to each button
function init() {
    generatePhrase(1);
    const singleButton = document.querySelector("#single-button");
    const multiButton = document.querySelector("#multi-button");
    singleButton.onclick = () => generatePhrase(1);
    multiButton.onclick = () => generatePhrase(5);
}

// returns a random element of the given array
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// generates a number of phrases line by line based on num
function generatePhrase(num) {
    let fullPhrase = "";
    for (let i = 0; i < num; ++i) {
        const phrase = `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}`;
        fullPhrase += `${phrase} <br>`;
    }
    document.querySelector("#output").innerHTML = fullPhrase;
}