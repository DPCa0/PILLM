 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(...arguments);
    }
};

const user = new Proxy({
    name: 'Alice',
    age: 30
}, handler);

function* fibonacciSequence(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

 
async function loadData() {
    const urls = ['https://api.example1.com/data', 'https://api.example2.com/data'];
    const promises = urls.map(url => fetchData(url));
    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            print(`Data from URL ${urls[index]}:`, result.value);
        } else {
            console.error(`Error loading data from URL ${urls[index]}:`, result.reason);
        }
    });
}

 
class Animal {
    #type;

    constructor(type) {
        this.#type = type;
    }

    #speak() {
        return `I am a ${this.#type}`;
    }

    publicSpeak() {
        return this.#speak();
    }
}

 
print('Accessing user name: ', user.name);
print([...fibonacciSequence(50)]);
loadData().catch(console.error);

const cat = new Animal('Cat');
print(cat.publicSpeak());
