 

 
const handler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' was accessed`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Property '${prop}' was set to ${value}`);
        return Reflect.set(...arguments);
    }
};

const obj = new Proxy({a: 1, b: 2}, handler);

 
function* numberSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

 
async function fetchData(number) {
    print(`Fetching data for number: ${number}`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Data for ${number}`);
        }, 1000);
    });
}

async function main() {
     
    print(obj.a);   
    obj.b = 10;           

     
    const gen = numberSequence();
    const number = gen.next().value;

     
    const data = await fetchData(number);
    print(data);
}

main();
