 

 
const fetchData = () => new Promise(resolve => setTimeout(() => {
    resolve({ name: "JavaScript", type: "Programming Language" });
}, 1000));

 
function* dataFetcher() {
    const data = yield fetchData();
    return `Fetched: ${data.name}, Type: ${data.type}`;
}

 
const loggingHandler = {
    get(target, property) {
        print(`Accessing property "${property}"`);
        return Reflect.get(...arguments);
    }
};

(async function() {
     
    const iterator = dataFetcher();
    const promise = iterator.next().value;
    
    const data = await promise;
    const result = iterator.next(data).value;
    
     
    const proxiedResult = new Proxy({ result }, loggingHandler);

     
    print(proxiedResult.result);
})();
