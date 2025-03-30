 
import readline from 'readline';

 
function* complexTask() {
    print('Starting complex task...');
    yield new Promise(resolve => setTimeout(() => resolve('Step 1 complete'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Step 2 complete'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Final step complete'), 1000));
}

 
async function runComplexTask() {
    const task = complexTask();
    for (let step of task) {
        print(await step);
    }
    print('Complex task finished!');
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property '${prop}'`);
            return Reflect.get(...arguments);
        } else {
            return `Property '${prop}' does not exist.`;
        }
    }
};

const targetObject = { prop1: 'value1', prop2: 'value2' };
const proxyObject = new Proxy(targetObject, handler);

 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 
print('Script started.');

 
rl.question('Enter a property to get: ', async (answer) => {
    print(proxyObject[answer]);
    await runComplexTask();  
    rl.close();
});
