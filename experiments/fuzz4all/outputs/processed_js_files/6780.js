 

 
function fakeApiCall(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://example.com/data') {
                resolve({ data: 'Fetched Data' });
            } else {
                reject('404: Not Found');
            }
        }, 1000);
    });
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting property '${property}'`);
            return target[property];
        } else {
            console.error(`Property '${property}' not found`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

async function fetchData() {
    const apiHandler = new Proxy({}, handler);
    try {
        const response = await fakeApiCall('https://example.com/data');
        apiHandler.data = response.data;
    } catch (error) {
        console.error(error);
    }
    print(apiHandler.data);  
}

fetchData();

 
function* numberGenerator() {
    let number = 0;
    while (number < 5) {
        yield number++;
    }
}

const numbers = numberGenerator();
for (const num of numbers) {
    print(num);
}

 
const myMap = new Map();
myMap.set('key1', 'value1').set('key2', 'value2');

const mySet = new Set([1, 2, 3, 3, 4]);

print([...myMap.entries()]);
print([...mySet]);

 
const { a = 1, b = 2 } = { a: 3 };
print(a, b);  

 
function tag(strings, ...values) {
    print(strings, values);
    return strings[0] + values.map((val, index) => val + strings[index + 1]).join('');
}

const name = 'World';
print(tag`Hello, ${name}!`);
