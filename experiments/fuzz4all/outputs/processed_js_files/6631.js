 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: 'John Doe', age: 30 });
        }, 2000);
    });
}

 
async function processData() {
    try {
        const data = await fetchData();
        print(`Data fetched: ${JSON.stringify(data)}`);
        
         
        const handler = {
            get(target, property) {
                if (property in target) {
                    print(`Accessing ${property}: ${target[property]}`);
                    return target[property];
                } else {
                    throw new ReferenceError(`Property "${property}" not found.`);
                }
            }
        };
        
        const proxy = new Proxy(data, handler);
        print(`User name is: ${proxy.name}`);
        print(`User age is: ${proxy.age}`);
        
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

processData();
