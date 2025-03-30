 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
}

const dataHandler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property ${prop} does not exist`);
            return null;
        }
    }
};

(async () => {
    try {
         
        const url = 'https://jsonplaceholder.typicode.com/posts/1';
        const data = await fetchData(url);

         
        const proxyData = new Proxy(data, dataHandler);

         
        print(`Title: ${proxyData.title}`);
        print(`Body: ${proxyData.body}`);
        print(`Non-existing property: ${proxyData.nonExistentProperty}`);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
