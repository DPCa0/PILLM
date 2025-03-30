 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Here is your data!' });
        }, 1000);
    });
};

 
async function getData() {
    try {
        const result = await fetchData();
        print(result.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    },
};

const targetObj = { message: 'Hello, Proxy!' };
const proxyObj = new Proxy(targetObj, handler);

print(proxyObj.message);  

 
getData();
