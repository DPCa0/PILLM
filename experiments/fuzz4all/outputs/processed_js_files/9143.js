 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 1000);
    });
};

 
function* dataProcessor(data) {
    for (const item of data) {
        yield item.toUpperCase();
    }
}

 
const processData = async () => {
    try {
        const rawData = await fetchData();
        const processedData = dataProcessor(rawData);

        let next = processedData.next();
        while (!next.done) {
            print(next.value);
            next = processedData.next();
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

 
const loggerProxy = new Proxy(processData, {
    apply(target, thisArg, argumentsList) {
        print(`Called processData with args: ${JSON.stringify(argumentsList)}`);
        return target.apply(thisArg, argumentsList);
    }
});

 
loggerProxy();
