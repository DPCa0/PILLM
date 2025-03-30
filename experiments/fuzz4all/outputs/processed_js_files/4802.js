 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(apiEndpoint) {
    print(`Fetching data from ${apiEndpoint}...`);
    await delay(1000);  
    return { data: `Data from ${apiEndpoint}` };
}

 
const apiHandler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
             
            return async () => {
                const response = await fetchData(prop);
                return response.data;
            };
        }
    }
};

 
const api = new Proxy({}, apiHandler);

 
(async () => {
    const uniqueValue = Symbol('unique');

    try {
        const result1 = await api.getUsers();
        print(result1);  

        const result2 = await api.getPosts();
        print(result2);  

        print(`Here is a unique symbol: ${uniqueValue.toString()}`);

         
        const uniqueSet = new Set([1, 2, 3, 4, 5, 5, 4]);
        print('Unique Set values:', [...uniqueSet]);

         
        const doubledValues = [...uniqueSet].map(x => x * 2);
        print('Doubled values:', doubledValues);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
