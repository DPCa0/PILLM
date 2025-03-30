 
async function* fetchData(urls) {
    for (const url of urls) {
        yield await (await fetch(url)).json();
    }
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property ${prop} not found`);
        }
    },
    set: function(target, prop, value) {
        if (typeof value === 'number') {
            print(`Setting ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        } else {
            throw new Error(`Property ${prop} must be a number`);
        }
    }
};

const dataHandler = new Proxy({}, handler);

(async () => {
    const urls = ['https://api.github.com/users/octocat', 'https://api.github.com/users/defunkt'];
    const dataGenerator = fetchData(urls);

    for await (const data of dataGenerator) {
        Object.assign(dataHandler, data);
        print(`Fetched data for: ${dataHandler.login}`);
    }
})();
