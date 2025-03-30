 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
    }
};

 
function* generateData(start = 1) {
    let id = start;
    while (true) {
        yield { id: id++, value: Math.random() * 100 };
    }
}

const customIterable = {
    [Symbol.iterator]: generateData
};

 
const handler = {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return prop in target ? target[prop] : 'Property not found';
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const dataProxy = new Proxy({}, handler);

 
(async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);
    
    const iterator = customIterable[Symbol.iterator]();
    print('Generated Data:', iterator.next().value);
    print('Generated Data:', iterator.next().value);

    dataProxy.title = 'Proxy Title';
    print('Proxy Get:', dataProxy.title);
})();
