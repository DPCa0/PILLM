 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

 
const dataLogger = {
    get: (target, property) => {
        print(`Accessing property '${property}'`);
        return target[property];
    }
};

 
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

 
(async () => {
    try {
         
        const data = await fetchData(apiUrl);

         
        const proxiedData = new Proxy(data, dataLogger);

         
        const generator = dataGenerator(proxiedData);

         
        for (let post of generator) {
            print(`Post #${post.id}: ${post.title}`);
             
            if (post.id >= 5) break;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
