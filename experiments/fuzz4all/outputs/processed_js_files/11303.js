 
const EventEmitter = require('events');

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve(`Data from ${url}`);
            } else {
                reject(new Error('Failed to fetch data'));
            }
        }, 1000);
    });
}

 
class DataFetcher extends EventEmitter {
    constructor(urls) {
        super();
        this.urls = urls;
    }

    async startFetching() {
        for (const url of this.urls) {
            try {
                const data = await fetchData(url);
                this.emit('data', data);
            } catch (error) {
                this.emit('error', error);
            }
        }
    }
}

 
const handler = {
    set(target, property, value) {
        if (property === 'urls' && !Array.isArray(value)) {
            throw new TypeError('URLs must be an array');
        }
        target[property] = value;
        return true;
    }
};

const fetcherProxy = new Proxy(new DataFetcher(['https://api1.com', 'https://api2.com']), handler);

 
fetcherProxy.on('data', data => print(`Received: ${data}`));
fetcherProxy.on('error', error => console.error(`Error: ${error.message}`));

 
fetcherProxy.startFetching();

 
function* evenNumbers(max) {
    let num = 0;
    while (num <= max) {
        yield num;
        num += 2;
    }
}

 
print('Even Numbers:');
for (const even of evenNumbers(10)) {
    print(even);
}
