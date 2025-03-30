 

 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const logHandler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const user = new Proxy({ name: 'Alice', age: 25 }, logHandler);

 
async function fetchData() {
    return new Promise((resolve) => setTimeout(() => resolve('Data fetched!'), 1000));
}

 
async function main() {
    print('Starting...');

     
    print(user.name);
    user.age = 26;

     
    const fibGen = fibonacciGenerator();
    print(fibGen.next().value);  
    print(fibGen.next().value);  
    print(fibGen.next().value);  

     
    const data = await fetchData();
    print(data);

    print('Completed.');
}

 
main();
