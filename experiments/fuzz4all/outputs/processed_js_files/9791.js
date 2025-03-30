 
async function fetchDataAndProcess(url) {
     
    const response = await fetch(url);
    const data = await response.json();

     
    const dataHandler = {
        get(target, property) {
            if (property in target) {
                print(`Accessing property: ${property}`);
                return target[property];
            } else {
                console.warn(`Property ${property} does not exist.`);
                return null;
            }
        }
    };
    const proxiedData = new Proxy(data, dataHandler);

     
    const { title, userId } = proxiedData;
    print(`Title: ${title}, User ID: ${userId}`);

     
    function* propertyGenerator(obj) {
        for (const key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }

     
    for (const [key, value] of propertyGenerator(proxiedData)) {
        print(`${key}: ${value}`);
    }
}

 
const testUrl = 'https://jsonplaceholder.typicode.com/posts/1';

 
fetchDataAndProcess(testUrl).catch(console.error);

 
(() => {
    const greet = name => `Hello, ${name}!`;
    print(greet('Advanced JS Enthusiast'));
})();
