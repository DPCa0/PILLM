 
const calculate = (operation = 'add', ...numbers) => {
    switch (operation) {
        case 'add':
            return numbers.reduce((acc, num) => acc + num, 0);
        case 'multiply':
            return numbers.reduce((acc, num) => acc * num, 1);
        default:
            return 'Invalid operation';
    }
};

 
const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return prop in obj ? obj[prop] : 'Property does not exist';
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const data = new Proxy({ a: 1, b: 2 }, handler);

 
const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return await response.json();
};

const fetchData = async (urls) => {
    try {
        const results = await Promise.all(urls.map(fetchJson));
        print(results);
    } catch (error) {
        console.error(error);
    }
};

 
const i18n = (strings, ...values) => {
    const translations = {
        hello: 'Bonjour',
        world: 'le monde'
    };
    return strings.map((str, index) => `${translations[str] || str}${values[index] || ''}`).join('');
};

 
(async () => {
    const { log } = console;
    data.a = 10;
    log(data.a);
    log(calculate('add', 1, 2, 3, 4, 5));
    log(i18n`hello, world!`);
    await fetchData(['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2']);
})();
