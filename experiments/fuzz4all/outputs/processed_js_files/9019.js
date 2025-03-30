 

const delay = ms => new Promise(res => setTimeout(res, ms));

const fetchData = async () => {
    await delay(1000);
    return { user: { name: 'Alice', age: 30 }, location: { city: 'Wonderland', country: 'Fiction' } };
};

const cache = new Map();

const dataHandler = {
    get: (target, property) => {
        if (cache.has(property)) {
            print(`Cache hit for ${property}`);
            return cache.get(property);
        } else {
            print(`Cache miss for ${property}`);
            if (property in target) {
                const value = target[property];
                cache.set(property, value);
                return value;
            }
        }
    }
};

(async () => {
    const { user: { name, age }, location: { city, country } } = await fetchData();
    const proxiedData = new Proxy({ name, age, city, country }, dataHandler);

    print(`Name: ${proxiedData.name}`);
    print(`Age: ${proxiedData.age}`);
    print(`City: ${proxiedData.city}`);
    print(`Country: ${proxiedData.country}`);

     
    print(`Accessing cached name: ${proxiedData.name}`);
})();
