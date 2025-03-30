 

async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
}

function* dataProcessor(data) {
    for (let item of data) {
        yield item * 2;
    }
}

const handler = {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw `Property ${property} does not exist on target`;
        }
    }
};

const dataHandler = {
    async process(url) {
        try {
            const response = await fetchData(url);
            const proxyData = new Proxy(response, handler);
            
            print("Processing data with Proxy and Generators:");
            for (let value of dataProcessor(proxyData.data)) {
                print(value);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
};

Reflect.construct(dataHandler.process, ["https://api.example.com/data"], dataHandler);
