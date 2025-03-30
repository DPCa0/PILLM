 
const handler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' has been accessed.`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const data = new Proxy({
    user: {
        name: 'Alice',
        age: 30,
        getDetails() {
            return `${this.name} is ${this.age} years old.`;
        }
    }
}, handler);

 
function* fetchData(urls) {
    for (let url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
async function processUrls(urls) {
    const iterator = fetchData(urls);
    for await (let data of iterator) {
        print(data);
    }
}

 
function tag(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i - 1] ? values[i - 1] : '';
        return `${result}${string.toUpperCase()}${value}`;
    });
}

 
print(tag`User Details: ${data.user.getDetails()}`);

processUrls(['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2']);

 
print(data.user.name);
print(data.user.getDetails());
