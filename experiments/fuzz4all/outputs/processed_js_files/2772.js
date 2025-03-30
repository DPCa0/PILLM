 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw error;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Property '${prop}' set to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
let primeSet = new Set([2, 3, 5, 7]);
primeSet.add(11);
primeSet.delete(5);

const printSet = set => [...set].join(', ');
print(`Prime numbers set: ${printSet(primeSet)}`);

(async () => {
    const dataUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    try {
        const data = await fetchData(dataUrl);
        print(`Fetched Data:`, data);

        user.name = 'Bob';  
        print(user.name);  
    } catch (error) {
        console.error('Error handling in main block:', error);
    }
})();
