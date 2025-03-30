 
const fetchData = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);  
    return { data: 'Hello, world!' };
};

function* dataProcessor(data) {
    for (let i = 0; i < data.length; i++) {
        yield data[i].toUpperCase();
    }
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(...arguments);
        }
        return `Property "${prop}" not found`;
    }
};

(async () => {
    try {
        const result = await fetchData();
        const dataProxy = new Proxy(result, handler);
        
        print(dataProxy.data);  

        const processor = dataProcessor(dataProxy.data);
        for (let char of processor) {
            print(char);  
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
