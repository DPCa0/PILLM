 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = Math.random() > 0.5 ? "Fetched data" : null;
            data ? resolve(data) : reject('Fetch failed');
        }, 1000);
    });
};

 
async function processData() {
    try {
        const data = await fetchData();
        print('Processing:', data);
        
         
        const uniqueItems = new Set([...Array(5)].map(() => Math.floor(Math.random() * 10)));
        print('Unique items:', [...uniqueItems]);

         
        const map = new Map();
        map.set('data', data);
        print('Data from Map:', map.get('data')?.toUpperCase());
        
         
        const module = await import('./module.js');
        module?.default();

    } catch (error) {
        console.error('Error:', error);
    }
}

 
const targetObject = {
    message: 'Intercepted'
};
const handler = {
    get: (target, prop, receiver) => {
        print(`Property '${prop}' was accessed.`);
        return Reflect.get(target, prop, receiver);
    }
};
const proxy = new Proxy(targetObject, handler);
print(proxy.message);

 
processData();
