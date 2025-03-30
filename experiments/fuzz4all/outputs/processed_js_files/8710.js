 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fetchSequence(urls) {
    for (let url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const targetObject = { name: "Proxy Target", data: [] };
const proxyObject = new Proxy(targetObject, handler);

 
async function asyncProcess() {
    const urls = [
        'https://api.spacexdata.com/v4/launches/latest',
        'https://api.spacexdata.com/v4/launches/next'
    ];

    const seq = fetchSequence(urls);

    for (const request of seq) {
        try {
            const data = await request;
            proxyObject.data.push(data);
            print(`Fetched: ${data.name || data.id}`);
        } catch (error) {
            console.error(`Fetch error: ${error}`);
        }
        await delay(1000);  
    }

    print('Final data:', proxyObject.data);
}

asyncProcess();

This code uses Promises, async/await, generator functions, and JavaScript proxies. It fetches SpaceX launch data sequentially, while logging operations on a proxied object.