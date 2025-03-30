(async () => {
     
    const fetchData = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: [1, 2, 3, 4, 5] });
        }, 1000);
    });

     
    const processData = ({ data }) => {
        const [first, ...rest] = data;
        return rest.map(item => item * first);
    };

     
    function* lazyProcessData(data) {
        for (let item of data) {
            yield item + 10;
        }
    }

    try {
        const rawData = await fetchData();
        const processedData = processData(rawData);
        
         
        const handler = {
            get: (target, prop) => {
                if (prop in target) {
                    print(`Accessing property ${prop}`);
                    return target[prop];
                }
                return 'Property not found';
            }
        };

        const dataProxy = new Proxy({ ...rawData, processedData }, handler);

        const lazyProcessed = lazyProcessData(dataProxy.processedData);
        
        print(dataProxy.data);  
        print([...lazyProcessed]);  
        print(dataProxy.nonExistent);  
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
