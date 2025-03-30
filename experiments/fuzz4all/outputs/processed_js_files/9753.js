 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async (url) => {
    print(`Fetching data from ${url}`);
    await delay(1000);  
    return { data: 'Sample Data from ' + url };
};

 
const handler = {
    get: (target, property) => {
        print(`Getting property: ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const dataStore = new Proxy({ initialized: false }, handler);

(async () => {
    try {
        const data = await fetchData('https://api.example.com/data');
        dataStore.data = data.data;
        dataStore.initialized = true;

        if (dataStore.initialized) {
            print(`Data stored: ${dataStore.data}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();

 
const [a, b = 42] = [undefined];
print(`Destructured values: a=${a}, b=${b}`);

 
const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
print(`Sum: ${sum(...[1, 2, 3, 4])}`);
