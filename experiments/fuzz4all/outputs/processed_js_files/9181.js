 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    print(`Fetching data from ${url}...`);
    await delay(1000);  
    return `Data from ${url}`;
}

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop);
    }
};

 
const urls = new Proxy(['https://api.example.com/1', 'https://api.example.com/2'], handler);

 
(async function main() {
    print('Starting data fetch...');
    const gen = dataGenerator(urls);
    for (const promise of gen) {
        try {
            const data = await promise;
            print('Received:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    print('Data fetch completed.');
})();
