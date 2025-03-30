 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                resolve(`Data from ${url}`);
            } else {
                reject('Fetch failed');
            }
        }, 1000);
    });
}

 
const reactiveHandler = {
    set(target, property, value) {
        print(`Property ${property} set to ${value}`);
        target[property] = value;
        return true;
    }
};

let dataState = new Proxy({}, reactiveHandler);

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generator = idGenerator();

 
async function loadMultipleData(urls) {
    try {
        const results = await Promise.all(urls.map(url => fetchData(url)));
        results.forEach(result => {
            const id = generator.next().value;
            dataState[id] = result;
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
loadMultipleData(urls);
