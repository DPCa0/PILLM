 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function delayedLog(msg, ms) {
    await delay(ms);
    print(msg);
}

 
const target = { value: 42 };
const handler = {
    get: (obj, prop) => {
        print(`Getting property ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};
const proxy = new Proxy(target, handler);

 
const map = new Map();
map.set('name', 'JavaScript');
map.set('year', 1995);

 
const set = new Set([1, 2, 3, 4]);

 
function* infiniteNumbers() {
    let i = 0;
    while (true) {
        yield i++;
    }
}
const numGen = infiniteNumbers();

 
async function main() {
    print(`Proxy initial value: ${proxy.value}`);
    proxy.value = 100;

    print(`Map size: ${map.size}`);
    map.forEach((value, key) => print(`${key}: ${value}`));

    print(`Set has 2? ${set.has(2)}`);
    set.add(5);
    set.forEach(value => print(`Set value: ${value}`));

    print(`First 5 numbers from generator:`);
    for (let i = 0; i < 5; i++) {
        print(numGen.next().value);
    }

    await delayedLog('This message is delayed by 1 second', 1000);
}

main();
