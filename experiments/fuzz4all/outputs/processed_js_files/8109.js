 
async function fetchData() {
    const simulatedAPI = () => new Promise((resolve) => {
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
    });

    try {
        const response = await simulatedAPI();
        const processedData = response.data
            .map(num => num * 2)            
            .filter(num => num > 5)        
            .reduce((acc, num) => acc + num, 0);  

        print(`Processed Data: ${processedData}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async function main() {
    print('Fetching and processing data...');
    await fetchData();

     
    const target = { message: "Hello, Proxy!" };
    const handler = {
        get: function(obj, prop) {
            return prop in obj ? obj[prop] : `Property ${prop} not found.`;
        }
    };
    const proxy = new Proxy(target, handler);

    print(proxy.message);  
    print(proxy.nonExistentProp);  

     
    const uniqueKey = Symbol('unique');
    const objWithSymbol = {
        [uniqueKey]: 'This is a unique property'
    };
    print(objWithSymbol[uniqueKey]);  
})();
