 

 
async function* fetchData() {
    const data = [
        { id: 1, value: 'JavaScript' },
        { id: 2, value: 'Python' },
        { id: 3, value: 'Rust' }
    ];
    
    for (const item of data) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield item;
    }
}

 
const handler = {
    get(target, prop) {
        print(`Accessing ${prop} of generator`);
        return target[prop];
    }
};

 
async function processData() {
    const proxyGen = new Proxy(fetchData(), handler);

    for await (const item of proxyGen) {
        print(`ID: ${item.id}, Value: ${item.value}`);
        print(`Template Literal: \nItem ID: ${item.id} - Value: ${item.value}`);
    }
}

 
processData();
