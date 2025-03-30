 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* delayedSequence() {
    yield delay(1000).then(() => 1);
    yield delay(2000).then(() => 2);
    yield delay(3000).then(() => 3);
}

 
async function asyncIterator(generator) {
    for (let promise of generator) {
        print(await promise);
    }
}

 
const targetObject = {
    async fetchData() {
         
        await delay(500);
        return { data: 'Fetched Data' };
    }
};

const handler = {
    get(target, prop, receiver) {
        if (prop === 'fetchData') {
            return async function() {
                print('Fetching data...');
                let result = await target[prop].apply(this, arguments);
                print('Data:', result.data);
                return result;
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

const proxiedObject = new Proxy(targetObject, handler);

 
async function main() {
    print(`Starting async iterator...`);
    await asyncIterator(delayedSequence());
    
    print(`\nStarting data fetch using Proxy...`);
    await proxiedObject.fetchData();
    
    print(`\nAll operations completed.`);
}

main();
