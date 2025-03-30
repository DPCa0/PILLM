 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: [1, 2, 3, 4, 5]});
        }, 1000);
    });
};

 
async function* asyncGenerator() {
    const response = await fetchData();
    for (const item of response.data) {
        yield item * 2;  
    }
}

 
(async () => {
    try {
        const processedResults = [];
        for await (const value of asyncGenerator()) {
            processedResults.push(value);
        }
        
         
        const [first, second, ...others] = processedResults;
        
         
        const uniqueValues = new Set([...others, first, second]);
        
        print('Unique Processed Results:', [...uniqueValues]);
        
         
        const target = {count: 10};
        const handler = {
            set(obj, prop, value) {
                if (typeof value !== 'number') {
                    throw new TypeError('The count must be a number');
                }
                obj[prop] = value;
                return true;
            }
        };
        const proxy = new Proxy(target, handler);
        
        proxy.count = 20;  
        print('Proxy Count:', proxy.count);
        
         
         
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
