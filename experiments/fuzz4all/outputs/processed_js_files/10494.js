 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = { message: 'Hello, World!' };
const proxyObject = new Proxy(targetObject, handler);

 
function logMessages({ message, ...rest }) {
    print('Message:', message);
    print('Other properties:', rest);
}

 
(async function main() {
    print('Starting program...');

     
    print(proxyObject.message);
    proxyObject.message = 'Goodbye, World!';
    print(proxyObject.message);

     
    const apiData = await fetchData('https://api.github.com');
    logMessages({ ...apiData, extra: 'Additional Info' });

     
    print(apiData?.nonExistentProperty ?? 'Default Value');

    print('Program completed.');
})();
