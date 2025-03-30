 

 
const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = {
            "https://api.example.com/data1": { id: 1, value: 'First' },
            "https://api.example.com/data2": { id: 2, value: 'Second' }
        };
        data[url] ? resolve(data[url]) : reject('404 Not Found');
    }, 1000);
});

 
function* urlGenerator() {
    yield "https://api.example.com/data1";
    yield "https://api.example.com/data2";
    yield "https://api.example.com/invalid";  
}

 
async function processUrls() {
    const urlIter = urlGenerator();
    let current = urlIter.next();

    while (!current.done) {
        try {
            const data = await fetchData(current.value);
            print(`Fetched: ${data.id} - ${data.value}`);
        } catch (error) {
            console.error(`Error fetching ${current.value}: ${error}`);
        }
        current = urlIter.next();
    }
}

 
class DataManager {
    static cache = new Map();

    constructor(data) {
        this.data = data;
    }

    saveToCache() {
        DataManager.cache.set(this.data.id, this.data);
        print(`Saved to cache: ${this.data.id} - ${this.data.value}`);
    }

    static showCache() {
        print('Cache Contents:');
        for (const [id, data] of DataManager.cache.entries()) {
            print(`${id}: ${JSON.stringify(data)}`);
        }
    }
}

 
(async () => {
    await processUrls();
    const dataManager1 = new DataManager({ id: 1, value: 'First' });
    dataManager1.saveToCache();

    const dataManager2 = new DataManager({ id: 2, value: 'Second' });
    dataManager2.saveToCache();

    DataManager.showCache();
})();
