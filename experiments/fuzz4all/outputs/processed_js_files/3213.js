 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print('Data fetched:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

 
function* processData(dataArray) {
    for (let data of dataArray) {
        yield data * 2;   
    }
}

 
const mySymbol = Symbol('customProperty');

const complexObject = {
    [mySymbol]: 'Secret Value',
    regularProperty: 'Public Value',
};

 
const handler = {
    get(target, property, receiver) {
        print(`Property '${property.toString()}' was accessed.`);
        return Reflect.get(target, property, receiver);
    }
};

const proxyObject = new Proxy(complexObject, handler);

 
(async () => {
    await delay(1000);
    print('1 second has passed');

    const url = 'https://api.example.com/data';
    const fetchedData = await fetchData(url);

    if (fetchedData) {
        const dataProcessor = processData(fetchedData);
        for (let value of dataProcessor) {
            print('Processed value:', value);
        }
    }

    print('Accessing regular property:', proxyObject.regularProperty);
    print('Accessing symbol property:', proxyObject[mySymbol]);
})();
