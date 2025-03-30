 

 
async function getRandomNumber() {
    return new Promise(resolve => setTimeout(() => resolve(Math.random()), 1000));
}

 
async function fetchData() {
    const randomNumber = await getRandomNumber();
    return {
        id: Math.floor(randomNumber * 100),
        value: randomNumber * 1000
    };
}

 
const loggingHandler = {
    get(target, prop) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
async function main() {
    const data = await fetchData();
    const proxiedData = new Proxy(data, loggingHandler);

    print(`Fetched data: ID=${proxiedData.id}, Value=${proxiedData.value.toFixed(2)}`);
    proxiedData.value *= 2;   
    print(`Updated value: ${proxiedData.value.toFixed(2)}`);
}

 
main();
