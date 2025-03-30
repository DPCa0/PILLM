 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const handler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} not found`;
        }
    },
    set(target, prop, value) {
        if (typeof value === 'number') {
            target[prop] = value * 2;  
            return true;
        } else {
            print(`Value for ${prop} must be a number`);
            return false;
        }
    }
};

const proxyObj = new Proxy({}, handler);

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        print(data);

        proxyObj.someValue = 10;
        print(proxyObj.someValue);  

        proxyObj.otherValue = 'string';  
        print(proxyObj.nonExistent);  

    } catch (error) {
        console.error('Fetch error:', error);
    }
})();
