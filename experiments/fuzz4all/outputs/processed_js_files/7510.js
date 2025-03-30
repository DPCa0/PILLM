 

 
const swap = ([a, b]) => ([b, a]);

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error: ', error);
        throw error;
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Getting property '${prop}'`);
        return prop in obj ? obj[prop] : 'Property not found';
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const originalObject = { name: 'John', age: 30 };
const proxyObject = new Proxy(originalObject, handler);

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    display() {
        print(`Vehicle: ${this.make} ${this.model}`);
    }
}

class Car extends Vehicle {
    constructor(make, model, doors) {
        super(make, model);
        this.doors = doors;
    }
    display() {
        print(`Car: ${this.make} ${this.model} with ${this.doors} doors`);
    }
}

 
(async function() {
    let [x, y] = swap([1, 2]);
    print(`Swapped values: x = ${x}, y = ${y}`);

    try {
        let data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched data:', data);
    } catch (error) {
        print('Error fetching data:', error);
    }

    proxyObject.name;  
    proxyObject