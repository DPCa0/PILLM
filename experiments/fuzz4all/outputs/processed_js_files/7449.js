 
async function fetchData(url) {
    try {
         
        const response = await fetch(url);
         
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch Error: ${error.message}`);
        throw error;
    }
}

 
function* numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield i;
    }
}

 
const module = (() => {
    let privateData = 'secret';

    function publicMethod() {
        return `Accessing: ${privateData}`;
    }

    return {
        publicMethod,
    };
})();

 
const handler = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { name: 'ProxyObject' };
const proxy = new Proxy(targetObject, handler);

 
(async function main() {
     
    for (let num of numberGenerator(5)) {
        print(`Generated number: ${num}`);
    }

     
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        print(`Fetched data:`, data);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }

     
    print(module.publicMethod());

     
    print(proxy.name);
    proxy.name = 'UpdatedProxyObject';
    print(proxy.name);
})();
