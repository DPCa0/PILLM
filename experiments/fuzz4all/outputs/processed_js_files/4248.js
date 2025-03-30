 
async function* fetchData(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        yield await response.json();
    }
}

 
const logHandler = {
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const data = { name: 'Alice', age: 25 };
const proxyData = new Proxy(data, logHandler);

 
(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    const results = [];
    for await (const item of fetchData(urls)) {
        results.push(item);
    }

     
    print(results);

     
    proxyData.name = 'Bob';
    print(proxyData.name);
})();

 
function format(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return `${result}${str}${values[i] ? `<strong>${values[i]}</strong>` : ''}`;
    }, '');
}

const name = "Charlie";
const age = 30;
print(format`Hello, ${name}. You are ${age} years old.`);
