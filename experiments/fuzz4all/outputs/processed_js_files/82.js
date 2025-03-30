 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Property '${prop}' accessed.`);
            return target[prop];
        } else {
            throw new ReferenceError(`Property '${prop}' does not exist.`);
        }
    },
    set(target, prop, value) {
        print(`Setting '${prop}' to '${value}'.`);
        target[prop] = value;
        return true;
    }
};

const data = new Proxy({ name: 'JavaScript', type: 'Language' }, handler);

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        print(jsonData);
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

 
(async () => {
    data.version = 'ES2023';
    
    try {
        print(`Version: ${data.version}`);
        print(`Language Type: ${data.type}`);
        await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
