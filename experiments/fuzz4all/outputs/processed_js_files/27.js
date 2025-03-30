 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

const createObserver = (target, handler) => new Proxy(target, handler);

const dataHandler = {
    set(target, key, value) {
        if (typeof value === 'object') {
            value = createObserver(value, dataHandler);
        }
        print(`Property ${key.toString()} set to ${value}`);
        target[key] = value;
        return true;
    },
    get(target, key) {
        if (key === Symbol.iterator) {
            return function* () {
                for (let [key, value] of target) {
                    yield [key, value];
                }
            };
        }
        print(`Property ${key.toString()} accessed`);
        return target[key];
    }
};

 
(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        const observedData = createObserver(new Map(Object.entries(data)), dataHandler);

         
        print(observedData.get('title'));
        observedData.set('userId', 42);

         
        for (let [key, value] of observedData) {
            print(`${key}: ${value}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
