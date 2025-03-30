class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        super.speak();
        print(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex');
dog.speak();

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url) {
            resolve(`Data from ${url}`);
        } else {
            reject('No URL provided');
        }
    }, 1000);
});

const processData = (data) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(data.toUpperCase());
    }, 500);
});

(async () => {
    try {
        const data = await fetchData('https://api.example.com/data');
        print('Fetched:', data);
        const processedData = await processData(data);
        print('Processed:', processedData);
    } catch (error) {
        console.error('Error:', error);
    }
})();

 
const target = {
    message1: 'hello',
    message2: 'everyone',
};

const handler = {
    get: (obj, prop) => {
        return prop in obj ? obj[prop] : 'Property not found';
    },
    set: (obj, prop, value) => {
        if (typeof value === 'string') {
            obj[prop] = value;
        } else {
            throw new TypeError('The value must be a string');
        }
    }
};

const proxy = new Proxy(target, handler);
print(proxy.message1);
proxy.message3 = 'world';
print(proxy.message3);
try {
    proxy.message4 = 123;  
} catch (e) {
    console.error(e);
}

 
const sym1 = Symbol('description');
const sym2 = Symbol('description');

const object = {
    [sym1]: 'value1',
    [sym2]: 'value2'
};

print(object[sym1]);  
print(object[sym2]);  

 
const set = new Set([1, 2, 3, 4, 4, 5]);
print([...set]);  