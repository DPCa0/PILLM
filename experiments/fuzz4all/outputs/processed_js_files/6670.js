 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Get property ${prop} with value ${target[prop]}`);
            return Reflect.get(...arguments);
        } else {
            print(`Property ${prop} does not exist`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Set property ${prop} to value ${value}`);
        return Reflect.set(...arguments);
    }
};

let obj = new Proxy({}, handler);

 
const SECRET_KEY = Symbol('secret');

 
obj.name = "Advanced JavaScript";
print(obj.name);  

 
class Fibonacci {
    static *sequence(limit) {
        let a = 0, b = 1;
        for (let i = 0; i < limit; i++) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

 
(async function() {
    let { x, y, z } = { x: 1, y: 2, z: 3 };
    print(x, y, z);

    const fibs = [...Fibonacci.sequence(5)];
    print(fibs);

    const asyncTask = () => new Promise(resolve => setTimeout(() => resolve("Task Complete"), 1000));
    const result = await asyncTask();
    print(result);
})();

 
obj[SECRET_KEY] = "This is a secret.";
print(obj[SECRET_KEY]);

 
const map = new Map();
map.set('key1', 'value1');

const set = new Set([1, 2, 3, 3, 4]);
set.add(5);

print(map.get('key1'));
print([...set]);

 
function tag(strings, ...values) {
    return strings.raw[0].toUpperCase() + values.join('');
}

let user = 'JavaScript';
print(tag`hello, ${user}`);
