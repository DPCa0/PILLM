 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    try {
         
        await delay(1000);
        print(`Fetching data from: ${url}`);

         
        const response = { data: { id: 1, name: 'Sample Data', nested: { field: 'value' } } };

         
        const { data: { name, nested: { field } } } = response;

        print(`Fetched Name: ${name}, Field: ${field}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(target, prop, receiver);
    }
};

 
(async () => {
    const data = await fetchData('https://api.example.com/data');

     
    const proxiedData = new Proxy(data, handler);

     
    print(proxiedData.name);
    print(proxiedData.nested);

     
    const urls = ['https://api.example.com/1', 'https://api.example.com/2'];
    const results = await Promise.all(urls.map(url => fetchData(url)));

    results.forEach(({ name, id }) => {
        print(`ID: ${id}, Name: ${name}`);
    });
})();
