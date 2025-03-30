 

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 1000);
    });
}

 
function* processFruits(fruits) {
    for (let fruit of fruits) {
        yield fruit.toUpperCase();
    }
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property ${property}`);
            return target[property];
        }
        return `No such property: ${property}`;
    }
};

 
(async function main() {
    try {
        const fruits = await fetchData();
        const proxyFruits = new Proxy(fruits, handler);
        
        const generator = processFruits(proxyFruits);
        print(generator.next().value);  
        print(generator.next().value);  
        print(generator.next().value);  
        
        print(proxyFruits[2]);  
        print(proxyFruits[10]);  
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
