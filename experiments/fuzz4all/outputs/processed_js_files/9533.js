 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            return `Property ${prop} does not exist.`;
        }
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const target = { name: 'Advanced JavaScript', year: 2023 };
const proxy = new Proxy(target, handler);

 
proxy.name;  
proxy.year = 2024;  
proxy.description;  

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');

 
const customIterable = new Set(['ES6', 'ES7', 'ES8']);
const map = new Map();

for (const feature of customIterable) {
    map.set(feature, feature.length);
}

 
for (const [feature, length] of map.entries()) {
    print(`${feature} has length ${length}`);
}

 
function* numberGenerator() {
    yield* [1, 2, 3];
    yield* [4, 5, 6];
}

for (const number of numberGenerator()) {
    print(`Generated number: ${number}`);
}

 
function tag(strings, ...values) {
    return strings.reduce((acc, str, idx) => acc + str + (values[idx] || ''), '');
}

const name = 'JavaScript';
const type = 'advanced';
print(tag`This is an ${type} ${name} program.`);
