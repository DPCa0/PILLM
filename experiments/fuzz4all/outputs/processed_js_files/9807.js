 

 
const fetchData = (data) => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.2 ? resolve(`Data: ${data}`) : reject('Fetch error');
    }, 1000);
});

async function getData(input) {
    try {
        const response = await fetchData(input);
        print(response);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
function* dataGenerator(inputs) {
    for (let input of inputs) {
        yield getData(input);
    }
}

 
const dataHandler = {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return prop in target ? target[prop] : 'Property does not exist';
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} with value: ${value}`);
        target[prop] = value;
        return true;
    }
};

const complexObject = {
    a: 10,
    b: 20,
    multiply() {
        return this.a * this.b;
    }
};

const proxiedObject = new Proxy(complexObject, dataHandler);

 
print(proxiedObject.a);
proxiedObject.b = 30;
print(proxiedObject.multiply());

 
const inputs = ['alpha', 'beta', 'gamma'];
const generator = dataGenerator(inputs);
for (const promise of generator) {
    promise;
}
