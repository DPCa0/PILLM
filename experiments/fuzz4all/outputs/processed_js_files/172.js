 

 
function* generateNumbers() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

 
async function fetchNumber(generator) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < 5; i++) {
         
        await delay(Math.random() * 1000);

         
        const number = generator.next().value;

        print(`Fetched number: ${number}`);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = {
    name: 'Example',
    count: 0
};

const proxy = new Proxy(targetObject, handler);

 
proxy.name;
proxy.count = 42;
print(`Name from Proxy: ${proxy.name}`);
print(`Count from Proxy: ${proxy.count}`);

 
const numberGenerator = generateNumbers();
fetchNumber(numberGenerator);
