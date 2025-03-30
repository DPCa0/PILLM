 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            Math.random() > 0.5 ? resolve(['apple', 'banana', 'cherry']) : reject('Fetch error');
        }, 1000);
    });
};

 
const getFruitsByLetter = async (letter) => {
    try {
        const fruits = await fetchData();
        const filteredFruits = fruits.filter(fruit => fruit.startsWith(letter));
        return filteredFruits.length ? filteredFruits : `No fruits found starting with '${letter}'`;
    } catch (error) {
        return `Error: ${error}`;
    }
};

 
(async () => {
     
    const letters = new Set(['a', 'b', 'c', 'd']);
    for (let letter of letters) {
        const result = await getFruitsByLetter(letter);
        print(`Fruits starting with '${letter}': ${result}`);
    }
})();

 
const complexData = {
    items: [
        { id: 1, name: 'Laptop', specs: { cpu: 'i7', ram: '16GB' } },
        { id: 2, name: 'Smartphone', specs: { cpu: 'Snapdragon', ram: '8GB' } },
    ],
};

const { items: [{ specs: { cpu, ram } }] } = complexData;
print(`Extracted specs: CPU = ${cpu}, RAM = ${ram}`);

 
const fruits = {
    apple: 5,
    banana: 3,
};

const handler = {
    get(target, property) {
        return property in target ? target[property] : 'Not available';
    },
    set(target, property, value) {
        if (typeof value === 'number' && value >= 0) {
            target[property] = value;
            return true;
        }
        console.warn('Invalid value');
        return false;
    },
};

const fruitsProxy = new Proxy(fruits, handler);

print(fruitsProxy.apple);  