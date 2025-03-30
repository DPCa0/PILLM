 

const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Fetched data from ${url}`);
            } else {
                reject('No URL provided');
            }
        }, 1000);
    });
};

const processResult = async (url) => {
    try {
        const result = await fetchData(url);
        print(result);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property ${prop} does not exist.`);
            return 'Default Value';
        }
    },
    set: (target, prop, value) => {
        if (typeof value === 'string') {
            target[prop] = value;
        } else {
            throw new TypeError('Value must be a string');
        }
    }
};

const dataStore = new Proxy({}, handler);

dataStore.validData = 'This is a valid string';
print(dataStore.validData);

try {
    dataStore.invalidData = 42;  
} catch (e) {
    console.error(e.message);
}

print(dataStore.nonExistentProperty);  

processResult('https://example.com/data');  
