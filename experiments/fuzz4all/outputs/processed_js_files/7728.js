 
const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};

function* dataGenerator(data) {
    for (let item of data) {
        yield item;
    }
}

const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing property "${property}" with value:`, target[property]);
            return target[property];
        } else {
            console.warn(`Property "${property}" not found`);
            return undefined;
        }
    }
};

const processData = async (url) => {
    const data = await fetchData(url);

    const proxiedData = data.map(item => new Proxy(item, handler));

    const iterator = dataGenerator(proxiedData);

    for (let entry of iterator) {
         
        print(`Processing entry with name: ${entry.name}`);
    }
};

 
processData('https://api.example.com/data');
