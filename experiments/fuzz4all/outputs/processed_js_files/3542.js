 

 
function* dataGenerator() {
    yield fetch('https://api.agify.io?name=michael').then(res => res.json());
    yield fetch('https://api.agify.io?name=sarah').then(res => res.json());
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property "${prop}" not found`);
            return undefined;
        }
    }
};

 
async function processData() {
    const dataGen = dataGenerator();
    let result = dataGen.next();

    while (!result.done) {
        const data = await result.value;
        const proxyData = new Proxy(data, handler);

         
        print(`Name: ${proxyData.name || "Unknown"}, Estimated Age: ${proxyData.age || "N/A"}`);
        print(`Non-existing property: ${proxyData.nonExisting || "Handled gracefully"}`);

        result = dataGen.next();
    }
}

processData();
