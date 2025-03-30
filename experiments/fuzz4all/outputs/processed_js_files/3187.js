 

 
async function fetchData() {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'John Doe', age: 30 });
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Property '${prop}' accessed`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property '${prop}' does not exist`);
            return undefined;
        }
    },
};

 
(async () => {
    try {
        const data = await fetchData();  
        const proxyData = new Proxy(data, handler);  

         
        print(proxyData.name);  
        print(proxyData.age);   
        print(proxyData.height);  
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
