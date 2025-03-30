 

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        } else {
            return `Property ${property} not found`;
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const proxyObject = new Proxy({}, handler);
proxyObject.a = 10;   
print(proxyObject.a);   
print(proxyObject.b);   

 
async function fetchData() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data retrieved"), 1000);
    });

    try {
        const data = await promise;
        print(data);   
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

 
const map = new Map();
map.set('name', 'Alice');
map.set('age', 25);

for (const [key, value] of map) {
    print(`${key}: ${value}`);
}

const set = new Set([1, 2, 3, 4, 4, 5]);
set.forEach(value => {
    print(value);   
});

 
const [first, ...rest] = [10, 20, 30, 40];
print(first);   
print(rest);   

const obj = { x: 1, y: 2, z: 3 };
const { x, ...otherProps } = obj;
print(x);   
print(otherProps);   

 
function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = generator();
print(gen.next().value);