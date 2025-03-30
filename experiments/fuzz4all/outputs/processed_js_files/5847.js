 

 
const fetchData = () => new Promise((resolve) => setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000));

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Accessing property "${prop}"`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property "${prop}" to "${value}"`);
        obj[prop] = value;
        return true;
    }
};

const main = async () => {
    try {
         
        const result = await fetchData();
        
         
        const generator = dataGenerator(result.data);
        
         
        const config = new Proxy({ threshold: 3 }, handler);

        print('Processing data:');
        let next = generator.next();
        while (!next.done) {
            const value = next.value;
            print(`Data: ${value}, Threshold: ${config.threshold}`);
            if (value > config.threshold) {
                config.threshold = value;
            }
            next = generator.next();
        }

        print('Final Threshold:', config.threshold);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

main();
