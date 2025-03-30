 
const handler = {
    get(target, prop, receiver) {
        if (prop === 'greet') {
            return Reflect.get(target, prop, receiver).bind(receiver);
        }
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        if (prop === 'name' && typeof value === 'string') {
            target[prop] = value.trim();
            return true;
        }
        return false;
    }
};

 
const person = new Proxy({
    name: '',
    greet() {
        print(`Hello, ${this.name}!`);
    }
}, handler);

 
async function setNameAsync(name) {
    return new Promise(resolve => {
        setTimeout(() => {
            person.name = name;
            resolve();
        }, 1000);
    });
}

 
(async function() {
    await setNameAsync('   Alice   ');
    person.greet();  

     
    const map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2']
    ]);

    for (let [key, value] of map) {
        print(`${key}: ${value}`);
    }

     
    function* idGenerator() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }

    const gen = idGenerator();
    print(gen.next().value);  
    print(gen.next().value);  
})();
