 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, name: 'Alice', age: 30 }), 1000);
    });
}

 
const logHandler = {
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

 
async function processUserData() {
    try {
        const data = await fetchData();
        const proxyData = new Proxy(data, logHandler);
        
        const { id, name, ...rest } = proxyData;   
        print(`User ID: ${id}, Name: ${name}`);
        
        proxyData.age += 1;   
        print(`Updated age: ${proxyData.age}`);
        
        return { id, name, ...rest };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
processUserData();
