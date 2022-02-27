const defaultData = { "favorites": [], "name": "", "results": 10, "content": "" },
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

export const setName = (str) => {
    const allValues = readLocalStorage();
    allValues.name = str;
    writeLocalStorage(allValues);
}

export const getName = () => readLocalStorage().name;

export const setResults = (num) => {
    const allValues = readLocalStorage();
    allValues.results = num;
    writeLocalStorage(allValues);
}

export const getResults = () => readLocalStorage().results;

export const setContent = (str) => {
    const allValues = readLocalStorage();
    allValues.content = str;
    writeLocalStorage(allValues);
}

export const getContent = () => readLocalStorage().content;