 

class NetworkRequest {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        const response = await fetch(this.url);
        return await response.json();
    }
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const generateID = idGenerator();

const logHandler = {
    get: (obj, prop) => {
        print(`Property '${prop}' has been accessed`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting '${prop}' to '${value}'`);
        obj[prop] = value;
        return true;
    }
};

const logger = new Proxy({}, logHandler);

(async function() {
    const request = new NetworkRequest('https://jsonplaceholder.typicode.com/posts/1');
    const data = await request.fetchData();
    logger.data = data;

    print(`Generated ID: ${generateID.next().value}`);
    print(`Data from Proxy: `, logger.data);
})();
