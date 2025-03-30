 
const arrayHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property ${prop} not found!`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const proxyArray = new Proxy([], arrayHandler);

 
function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const sequence = infiniteSequence();

 
async function asyncOperation() {
    return new Promise(resolve => setTimeout(() => resolve('Async operation complete'), 1000));
}

(async function main() {
    try {
        proxyArray.push(1);
        proxyArray.push(2);
        
        print(`Array length: ${proxyArray.length}`);
        
        const result = await asyncOperation();
        print(result);
        
        print(`Sequence value: ${sequence.next().value}`);
        
        const doubledArray = proxyArray.map(x => x * 2);
        print(`Doubled values: ${doubledArray}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
