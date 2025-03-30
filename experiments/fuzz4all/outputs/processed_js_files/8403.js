 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'JavaScript', type: 'Programming Language' });
        }, 1000);
    });
};

 
const mapOverData = (fn, data) => data.map(fn);

 
async function main() {
    try {
        const data = await fetchData();  
        print('Fetched Data:', data);

        const processedData = mapOverData(
            item => `${item.name} is a ${item.type}.`,
            [data]
        );

         
        const handler = {
            get: (target, prop) => {
                if (prop in target) {
                    print(`Accessing element ${prop}:`, target[prop]);
                    return target[prop];
                }
                return undefined;
            }
        };

        const proxy = new Proxy(processedData, handler);
        print('Processed Data:', proxy[0]);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();  
