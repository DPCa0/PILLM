 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: function(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set: function(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const user = new Proxy({}, handler);
user.name = 'Alice';
print(user.name);

 
const uniqueNumbers = new Set([1, 2, 3, 4, 4]);
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);

const [firstUnique] = uniqueNumbers;
const [, value2] = map;

print(`First unique number: ${firstUnique}`);
print(`Second map value: ${value2}`);

 
function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

const sequence = generateSequence();
for (const num of sequence) {
    print(`Generated number: ${num}`);
}

 
(async function() {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);
})();
