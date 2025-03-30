 

 
const handler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const data = new Proxy({ name: 'Alice', age: 30 }, handler);

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve({ profession: 'Engineer' }), 1000);
});

 
async function* processData() {
    const result = await fetchData();
    yield { ...data, ...result };
}

 
const processedDataMap = new Map();

(async () => {
    const iterator = processData();
    
    for await (const value of iterator) {
        const id = `user_${Math.floor(Math.random() * 1000)}`;
        processedDataMap.set(id, value);
        print(`Data stored with id: ${id}`);
    }

     
    for (const [id, userData] of processedDataMap.entries()) {
        print(`ID: ${id}, Data:`, userData);
    }
})();

 
data.name = 'Bob';    
print(data.age);  
