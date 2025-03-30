 
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i - 1];
        return `${result}<span class="highlight">${value}</span>${string}`;
    });
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return Reflect.get(...arguments);
        } else {
            print(`Property ${prop} not found!`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

let user = { name: 'Alice', age: 30 };
const proxyUser = new Proxy(user, handler);

 
print(proxyUser.name);
proxyUser.name = 'Bob';

 
function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fibSequence = [...fibonacci(6)];  
print(fibSequence);  

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

 
 

 
const name = "Charlie";
const age = 28;
print(highlight`User ${name} is ${age} years old.`);
