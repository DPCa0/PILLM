 
const handler = {
    get(target, prop) {
        if (prop === 'secret') {
            return `You found the secret: ${target[prop]}`;
        }
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        if (typeof value === 'string') {
            return Reflect.set(target, prop, value.toUpperCase());
        }
        return Reflect.set(target, prop, value);
    }
};

const secretAgent = new Proxy({ name: 'Bond', number: 7, secret: 'Double-0 Seven' }, handler);

print(secretAgent.name);     
print(secretAgent.secret);   

secretAgent.name = 'james';
print(secretAgent.name);     

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error(error);
    }
}

 
const url = 'https://jsonplaceholder.typicode.com/posts/1';
fetchData(url);

 
class Counter {
    #count = 0;

    increment() {
        this.#count += 1;
        print(`Counter: ${this.#count}`);
    }

    getCount() {
        return this.#count;
    }
}

const myCounter = new Counter();
myCounter.increment();   
print(myCounter.getCount());   
