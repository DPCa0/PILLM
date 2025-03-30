 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 1000);
    });
}

 
function createLoggingProxy(targetArray) {
    return new Proxy(targetArray, {
        get(target, prop) {
            if (typeof prop === 'string' && !isNaN(prop)) {
                print(`Accessing element at index: ${prop}`);
            }
            return target[prop];
        }
    });
}

 
const logMethodSymbol = Symbol('log');

 
class CustomLogger {
    constructor(name) {
        this.name = name;
    }

    [logMethodSymbol](message) {
        print(`[${this.name}] ${message}`);
    }
}

(async () => {
     
    const data = await fetchData();

     
    const loggedData = createLoggingProxy(data);

     
    const logger = new CustomLogger('AsyncDataFetcher');

     
    logger[logMethodSymbol]('Data fetched successfully');
    
     
    print(loggedData[0]);
    print(loggedData[1]);
})();
