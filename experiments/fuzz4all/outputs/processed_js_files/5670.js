 

 
const moduleExample = (() => {
    const privateData = new WeakMap();

    class DataManager {
        constructor() {
            privateData.set(this, { items: [] });
        }

        addItem(item) {
            const data = privateData.get(this);
            data.items.push(item);
        }

        getItems() {
            return [...privateData.get(this).items];
        }
    }

    return new DataManager();
})();

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

async function processUrls(urls) {
    const results = [];

    for (const url of urls) {
        try {
            const { data } = await fetchData(url);
            results.push(data);
            moduleExample.addItem(data);
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error.message);
        }
    }
    return results;
}

 
(async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2'];
    const results = await processUrls(urls);

     
    const [firstResult, ...restResults] = results;
    print('First result:', firstResult);
    print('Remaining results:', restResults);

    print('Data stored in module:', moduleExample.getItems());
})();
