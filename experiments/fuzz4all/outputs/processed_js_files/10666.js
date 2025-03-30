 

 
function* fetchData() {
    yield new Promise(resolve => setTimeout(() => resolve('Data Part 1'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data Part 2'), 1000));
    return 'Data Complete';
}

 
async function handleData() {
    const generator = fetchData();
    let result = await generator.next().value;
    print(result);

    result = await generator.next().value;
    print(result);

    result = generator.next().value;  
    print(result);
}

 
const dataHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property: ${property}`);
            return target[property];
        } else {
            print(`Property ${property} doesn't exist`);
            return undefined;
        }
    }
};

// The main async function
(async function main() {
    const data = { part1: "Loading...", part2: "Loading...", complete: "Loading..." };
    const proxyData = new Proxy(data, dataHandler);

    await handleData();

    // Simulate data assignment
    proxyData.part1 = 'Data Part 1';
    proxyData.part2 = 'Data Part 2';
    proxyData.complete = 'Data Complete';

    print(proxyData.part1);
    print(proxyData.part2);
    print(proxyData.complete);
})();
