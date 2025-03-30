 

 
const fetchData = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: { value1: 42, value2: 84 } });
        }, 1000);
    });
};

 
function* dataGenerator(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
async function processData(urls) {
    const generator = dataGenerator(urls);
    for (let promise of generator) {
        const { data: { value1, value2 } } = await promise;
        print(`Processed values: ${value1}, ${value2}`);
    }
}

 
const handler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Called processData with arguments: ${JSON.stringify(argumentsList)}`);
        return Reflect.apply(...arguments);
    }
};

const processProxy = new Proxy(processData, handler);

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
processProxy(urls);
