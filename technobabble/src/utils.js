// returns a random element of the given array
export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}