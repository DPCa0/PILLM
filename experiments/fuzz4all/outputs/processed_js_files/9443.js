 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const fibonacciProxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property ${prop} does not exist`);
            return undefined;
        }
    }
};

 
const fibProxy = new Proxy({}, fibonacciProxyHandler);

 
const fibGen = fibonacciGenerator();

 
for (let i = 0; i < 10; i++) {
    fibProxy[i] = fibGen.next().value;
}

 
print(fibProxy[3]);  
print(fibProxy[9]);  
print(fibProxy[20]);  

 
(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    async function simulateAsyncTask() {
        await delay(1000);
        print('Async task complete!');
    }

    print('Starting async task...');
    await simulateAsyncTask();
})();

 
const employeeSalaries = new Map([
    ['Alice', 50000],
    ['Bob', 60000],
    ['Charlie', 55000]
]);

 
const averageSalary = [...employeeSalaries.values()].reduce((acc, salary) => acc + salary, 0) / employeeSalaries.size;
print(`Average Salary: ${averageSalary}`);

 
const upperCasedNames = Array.from(employeeSalaries.keys(), name => name.toUpperCase());
print(`Upper-cased Employee Names: ${upperCasedNames.join(', ')}`);
