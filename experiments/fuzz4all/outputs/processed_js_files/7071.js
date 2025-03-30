 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const handler = {
    get: (obj, prop) => (prop in obj ? obj[prop] : 'Property not found'),
    set: (obj, prop, value) => {
        if (typeof value === 'number') {
            obj[prop] = value;
            return true;
        } else {
            console.warn('Value must be a number');
            return false;
        }
    }
};

const myObject = new Proxy({}, handler);

 
function* generateSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const [first, second, ...rest] = generateSequence();

 
const privateData = new WeakMap();

class CustomClass {
    constructor(name) {
        privateData.set(this, { name });
    }

    getName() {
        return privateData.get(this).name;
    }
}

const instance = new CustomClass('Advanced JavaScript');

 
async function main() {
     
    myObject.a = 10;
    myObject.b = 'not a number';  

    print('Proxy:', myObject.a, myObject.b);

     
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

     
    print('Generator output:', first, second, rest[0], rest[1]);

     
    print('Private property:', instance.getName());
}

main();
