 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { id: 1, name: 'Item', value: 42 };
        Math.random() > 0.2 ? resolve(data) : reject(new Error('Fetch error'));
    }, 1000);
});

 
const handler = {
    get: (target, property) => {
        print(`Accessed property: ${property}`);
        return property in target ? target[property] : null;
    },
    set: (target, property, value) => {
        if (property === 'value' && typeof value !== 'number') {
            console.error('Value must be a number');
            return false;
        }
        print(`Set property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
function* processGenerator(data) {
    yield `Processing ID: ${data.id}`;
    yield `Processing Name: ${data.name}`;
    yield `Processing Value: ${data.value}`;
}

 
async function run() {
    try {
        const data = await fetchData();
        
         
        const proxyData = new Proxy(data, handler);
        
         
        print(proxyData.name);

         
        const generator = processGenerator(proxyData);
        for (const step of generator) {
            print(step);
        }

         
        proxyData.value = 'invalid';  
        proxyData.value = 99;         

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

run();
