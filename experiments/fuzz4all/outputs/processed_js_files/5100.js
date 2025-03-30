 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: 'John Doe', age: 25 };
            resolve(data);
        }, 2000);
    });
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property '${prop}' was accessed`);
        return Reflect.get(...arguments);
    }
};

const proxyData = new Proxy(fetchData, handler);

 
async function processUserData() {
    try {
        const data = await proxyData('https://api.example.com/user');
        const { id, name, age } = data;

         
        print(`User Data: ID = ${id}, Name = ${name}, Age = ${age}`);

         
        const additionalData = { location: 'New York', occupation: 'Engineer' };
        const completeUserData = { ...data, ...additionalData };
        
        print('Complete User Data:', completeUserData);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
(async () => {
    await processUserData();
})();
