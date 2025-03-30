 
async function* fetchWithRetries(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Attempt ${i + 1}: Failed to fetch`);
            yield response.json();
            return;
        } catch (error) {
            console.warn(error.message);
        }
    }
    throw new Error('All retry attempts failed.');
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property '${prop}'`);
            return target[prop];
        }
        throw new ReferenceError(`Property '${prop}' does not exist.`);
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    },
};

const data = new Proxy({}, handler);

 
const processData = ({ results, ...metadata }) => {
    print('Metadata:', metadata);
    print('First result:', results[0]);
};

 
(async () => {
    try {
        const url = 'https://api.example.com/data';  
        for await (const jsonData of fetchWithRetries(url)) {
            Object.assign(data, jsonData);  
            processData(data);  
        }
    } catch (error) {
        console.error(error.message);
    }
})();
