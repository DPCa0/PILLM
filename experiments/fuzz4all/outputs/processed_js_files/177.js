 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
function* processGenerator(data) {
    yield `Processing ${data[0]}`;
    yield `Processing ${data[1]}`;
    yield `Processing ${data[2]}`;
}

 
async function main() {
    try {
        const urls = ['url1', 'url2', 'url3'];
        
         
        const dataPromises = urls.map(url => fetchData(url));
        const dataResults = await Promise.all(dataPromises);
        
         
        print('Fetched Data:', dataResults);

         
        const generator = processGenerator(dataResults);
        for (const result of generator) {
            print(result);
        }
        
         
        const target = { message: "All operations completed successfully!" };
        const handler = {
            get: function(obj, prop) {
                print(`Accessing property "${prop}"`);
                return prop in obj ? obj[prop] : "Property not found";
            }
        };
        
        const proxy = new Proxy(target, handler);
        print(proxy.message);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
