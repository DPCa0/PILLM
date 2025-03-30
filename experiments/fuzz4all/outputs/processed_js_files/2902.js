 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData1 = async () => {
    await delay(1000);  
    return { id: 1, value: 42 };
};

const fetchData2 = async () => {
    await delay(2000);  
    return { id: 2, value: 84 };
};

 
const createLoggingProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessed property "${prop}" with value "${obj[prop]}"`);
            return obj[prop];
        },
        set: (obj, prop, value) => {
            print(`Updated property "${prop}" to value "${value}"`);
            obj[prop] = value;
            return true;
        }
    });
};

 
const main = async () => {
    try {
         
        const results = await Promise.all([fetchData1(), fetchData2()]);
        print('Fetched Data:', results);

         
        const dataProxy = createLoggingProxy({ data1: results[0], data2: results[1] });

         
        print('Data1 Value:', dataProxy.data1.value);
        dataProxy.data1.value = 100;
        print('Updated Data1 Value:', dataProxy.data1.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

main();
