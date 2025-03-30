 

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Property '${property}' accessed, value: ${target[property]}`);
            return target[property];
        } else {
            throw new ReferenceError(`Property '${property}' does not exist.`);
        }
    }
};

const targetObject = {
    name: 'Advanced JS',
    version: 'ES2023'
};

const proxyObject = new Proxy(targetObject, handler);

 
const sym = Symbol('unique');

function* generator() {
    yield 'Step 1';
    yield 'Step 2';
    yield 'Step 3';
    yield sym;
}

 
async function complexAsyncOperation() {
    print('Starting complex async operation...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    print('Async operation in progress...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    print('Async operation completed!');
    return 'Result from async operation';
}

 
async function demonstrateAdvancedFeatures() {
    try {
        print(proxyObject.name);
        print(proxyObject['version']);
        
        const iterator = generator();
        for (const step of iterator) {
            if (step === sym) {
                print('Symbol reached in generator.');
            } else {
                print(step);
            }
        }
        
        const result = await complexAsyncOperation();
        print(result);
        
    } catch (error) {
        console.error(error.message);
    }
}

demonstrateAdvancedFeatures();
