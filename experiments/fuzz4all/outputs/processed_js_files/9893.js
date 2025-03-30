 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Complex Data' });
        }, 1000);
    });
};

 
(async () => {
    try {
        print('Fetching Data...');
         
        const { data } = await fetchData();
        
         
        const handler = {
            get: (target, property) => {
                print(`Accessed property: ${property}`);
                return target[property];
            }
        };

        const dataProxy = new Proxy({ content: data }, handler);

         
        function* dataProcessor() {
            yield `Processing ${dataProxy.content}...`;
            yield `Finalizing ${dataProxy.content}.`;
            return `Completed ${dataProxy.content}`;
        }

        const processor = dataProcessor();
        for (let step of processor) {
            print(step);
        }

         
        const metaMap = new Map();
        metaMap.set('status', 'success');
        metaMap.set('timestamp', new Date());

         
        for (let [key, value] of metaMap) {
            print(`${key}: ${value}`);
        }

    } catch (error) {
        console.error('Error:', error);
    }
})();
