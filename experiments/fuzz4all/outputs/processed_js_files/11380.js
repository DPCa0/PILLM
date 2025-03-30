 

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} does not exist.`;
        }
    },
    set: function(target, prop, value) {
        if (typeof value === 'number') {
            target[prop] = value;
            return true;
        } else {
            console.error(`Only numbers are allowed for property ${prop}.`);
            return false;
        }
    }
};

const obj = new Proxy({}, handler);

obj.a = 10;    
print(obj.a);   

obj.b = 'text';   

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
function delayedResolve(value) {
    return new Promise(resolve => setTimeout(() => resolve(value), 1000));
}

async function asyncFunction() {
    const result = await delayedResolve("Async/Await Example");
    print(result);
}

asyncFunction();

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
print(map.get('key1'));   

const set = new Set();
set.add(1);
set.add(2);
set.add(2);   
print(set.has(2));   

 
const coords = [10, 20, 30];
const [x, y, z] = coords;
print(x, y, z);   

const newCoords = [...coords, 40, 50];
print(newCoords);   

 
function tag(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

const name = "World";
const tagged =