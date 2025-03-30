 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print('Fetching data...');
    await delay(1000);  
    return new Map([
        ['name', 'Alice'],
        ['age', 30],
        ['location', 'Wonderland']
    ]);
}

 
const handler = {
    get(target, prop) {
        print(`Getting ${prop} from map`);
        return target.get(prop);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value} in map`);
        target.set(prop, value);
        return true;
    }
};

 
async function main() {
    const data = await fetchData();
    const proxyMap = new Proxy(data, handler);
    
     
    print(`Name: ${proxyMap.name}`);
    print(`Age: ${proxyMap.age}`);
    
     
    proxyMap.location = 'New Wonderland';
    print(`Updated Location: ${proxyMap.location}`);
}

main().catch(error => console.error('Error:', error));
