 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(...arguments);
        } else {
            print(`Property ${prop} not found!`);
            return undefined;
        }
    }
};

 
function* processData(data) {
    for (let item of data) {
        yield `${item.title}: ${item.completed}`;
    }
}

 
(async () => {
    try {
        const dataUrl = 'https://jsonplaceholder.typicode.com/todos';
        let data = await fetchData(dataUrl);
        
         
        const proxyData = new Proxy(data, handler);

         
        const processedData = processData(proxyData);

         
        const clonedData = [...processedData];
        for (let info of clonedData) {
            print(info);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
})();
