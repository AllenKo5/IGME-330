const loadFile = (url, callback, errorCallback) => {
    const fetchPromise = async () => {
        const response = await fetch(url);
        callback(await response.json());
    }
    fetchPromise().catch((e) => {
        console.log(`In catch with e = ${e}`);
        errorCallback();
    });
};

export { loadFile };