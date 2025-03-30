class DataManager {
    #data = new Map();

    async fetchData(url) {
        const response = await fetch(url);
        const result = await response.json();
        this.#data = new Map(Object.entries(result));
    }

    getData(key) {
        return this.#data.get(key) ?? 'No Data Available';
    }
}

async function* dataGenerator(dataManager, keys) {
    for (const key of keys) {
        yield dataManager.getData(key);
    }
}

(async () => {
    const manager = new DataManager();
    await manager.fetchData('https://api.example.com/data');

    const keysToFetch = ['key1', 'key2', 'key3'];
    const generator = dataGenerator(manager, keysToFetch);

    for await (const value of generator) {
        print(`Fetched: ${value}`);
    }
})();
