 
'use strict';

 
const defaultHandler = {
    get(target, prop) {
        return prop in target ? target[prop] : `No such property: ${prop}`;
    }
};

 
const target = {
    greet: 'Hello',
    location: 'world'
};

 
const proxy = new Proxy(target, defaultHandler);

 
function taggedTemplate(strings, ...values) {
    const interpolated = strings.reduce((result, string, i) => {
        let value = values[i - 1];
        if (typeof value === 'function') {
            value = value();  
        }
        return result + value + string;
    });
    return interpolated;
}

 
async function fetchDataAndGreet() {
     
    const fetchData = new Promise((resolve) => setTimeout(() => resolve('friend'), 1000));
    const data = await fetchData;

     
    print(taggedTemplate`${() => proxy.greet}, ${data || proxy.location}!`);
}

 
const user = {
    name: 'Alice',
    preferences: null
};

const favoriteColor = user?.preferences?.color ?? 'unknown';

 
const uniqueItems = new Set([1, 2, 3, 4, 4, 5]);
const itemCounts = new Map([...uniqueItems].map(item => [item, item * 2]));

 
for (const [key, value] of itemCounts) {
    print(`Item: ${key}, Count: ${value}`);
}

 
fetchDataAndGreet();
