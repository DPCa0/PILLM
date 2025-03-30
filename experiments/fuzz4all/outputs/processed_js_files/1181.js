 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    }, 1000);
});

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
async function main() {
     
    const data = await fetchData();
    
     
    const proxyData = new Proxy(data, handler);
    
     
    proxyData.forEach(item => {
        print(`User: ${item.name}`);
    });
    
     
    proxyData[1].name = 'Charlie';
    
     
    print('Final Data:', proxyData);
}

 
main();
