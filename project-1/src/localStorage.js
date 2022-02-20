const defaultData = { "favorites": [] },
    storeName = "ask9458-p1-favorites";

const readLocalStorage = () => {
    let allValues = null;

    try {
        allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    } catch (err) {
        console.log(`Problem with JSON.parse() and ${storeName} !`);
        throw err;
    }

    return allValues;
};

const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
};

export const clearLocalStorage = () => writeLocalStorage(defaultData);

export const addFavorite = (str) => {
    const allValues = readLocalStorage();

    allValues.favorites.push(str);
    writeLocalStorage(allValues);
};

export const removeFavorite = (str) => {
    const allValues = readLocalStorage();

    for (let i = 0; i < allValues.favorites.length; i += 1) {
        if (allValues.favorites[i] === str) {
            allValues.favorites.splice(i, 1);
            i -= 1;
        }
    }

    writeLocalStorage(allValues);
}

export const getFavorites = () => readLocalStorage().favorites;

export const clearFavorites = () => {
    const allValues = readLocalStorage();

    allValues.favorites = [];
    writeLocalStorage(allValues);
};