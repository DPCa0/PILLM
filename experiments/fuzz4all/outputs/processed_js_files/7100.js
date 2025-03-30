 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const complexObject = {
    a: 1,
    b: 2,
    c: 3,
    get sum() {
        return this.a + this.b + this.c;
    }
};

const handler = {
    get(target, prop, receiver) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(...arguments);
    }
};

const proxyObject = new Proxy(complexObject, handler);

 
async function fetchData() {
    const data = await new Promise(resolve => setTimeout(() => resolve('Fetched Data'), 1000));
    print(data);
    return data;
}

function processData(data) {
    return new Promise(resolve => {
        print(`Processing: ${data}`);
        setTimeout(() => resolve(`${data} -> Processed`), 1000);
    });
}

 
async function main() {
     
    print('Fibonacci Sequence:');
    for (const num of fibonacci(5)) {
        print(num);
    }

     
    print('Sum:', proxyObject.sum);
    proxyObject.a = 5;
    print('Updated Sum:', proxyObject.sum);

     
    const fetchedData = await fetchData();
    const processedData = await processData(fetchedData);
    print('Final Result:', processedData);
}

main();
