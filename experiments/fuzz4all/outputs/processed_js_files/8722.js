 

 
const apiCall = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Response from ${url}`);
        }, 1000);
    });
};

 
function* generateUrls() {
    yield 'https://api.example.com/endpoint1';
    yield 'https://api.example.com/endpoint2';
    yield 'https://api.example.com/endpoint3';
}

 
const handler = {
    get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist.`;
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const dataStore = new Proxy({}, handler);

 
async function processUrls() {
    const urlGen = generateUrls();
    for (const url of urlGen) {
        try {
            const response = await apiCall(url);
            print(response);
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error);
        }
    }
}

 
async function main() {
    await processUrls();

    dataStore.apiKey = '12345';  

    print(dataStore.apiKey);  
    print(dataStore.nonExistentProperty);  
}

 
main();
