 

 
const generatorSymbol = Symbol('generatorSymbol');

 
function* numberGenerator() {
    let i = 1;
    while (true) {
        yield i++;
    }
}

 
const generatorProxyHandler = {
    get(target, prop) {
        if (prop === generatorSymbol) {
            return target();
        }
        return target[prop];
    }
};

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data fetched"), 1000);
    });
}

async function processData() {
    print("Start processing...");
    const data = await fetchData();
    print(data);

     
    const generator = new Proxy(numberGenerator, generatorProxyHandler)[generatorSymbol];
    print("First value from generator:", generator.next().value);
    print("Second value from generator:", generator.next().value);
}

processData();
