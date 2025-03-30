 

 
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry', 'date']);
        }, 1000);
    });
}

 
const uniqueFruits = new Set(['apple', 'banana']);

 
const fruitsProxy = new Proxy(uniqueFruits, {
    get(target, prop) {
        print(`Getting property ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        print(`Checking if ${prop} exists`);
        return target.has(prop);
    }
});

 
async function processData() {
    const data = await fetchData();
    print('Fetched data:', data);

     
    const [first, second, ...others] = data;
    print(`First: ${first}, Second: ${second}, Others: ${others}`);

     
    const upperCaseFruits = data.map(fruit => fruit.toUpperCase());

     
    const moreFruits = [...upperCaseFruits, ...others];
    moreFruits.forEach(fruit => fruitsProxy.add(fruit));

    print('All fruits:', [...fruitsProxy]);
}

processData();
