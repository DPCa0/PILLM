 

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

 
async function fetchData(url) {
     
    return new Promise(resolve => {
        setTimeout(() => resolve(`Fetched data from ${url}`), 1000);
    });
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property "${prop}": ${target[prop]}`);
            return Reflect.get(target, prop, receiver);
        }
        return undefined;
    },
    set(target, prop, value, receiver) {
        print(`Setting property "${prop}" to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
async function main() {
     
    print(user.name);
    user.age = 31;

     
    const gen = numberGenerator();
    print(`Generated number: ${gen.next().value}`);
    print(`Generated number: ${gen.next().value}`);

     
    const data = await fetchData('https://api.example.com/data');
    print(data);
}

 
main();
