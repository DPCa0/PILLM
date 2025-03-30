 
async function complexFeatureDemo() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handler = {
        get: (target, property) => {
            if (property === Symbol.toStringTag) return 'ComplexFeatureObject';
            if (property in target) {
                return target[property];
            } else {
                console.warn(`Property ${property} does not exist`);
                return undefined;
            }
        },
        set: (target, property, value) => {
            if (typeof value === 'number' && value >= 0) {
                target[property] = value;
                return true;
            } else {
                console.error('Invalid value. Must be a non-negative number');
                return false;
            }
        }
    };

    let targetObject = {
        value: 10
    };

    const proxyObject = new Proxy(targetObject, handler);

    proxyObject.value = 20;  
    proxyObject.negativeValue = -5;  

    print(proxyObject.value);  
    print(proxyObject.nonExistent);  

    const asyncOperation = async () => {
        print("Starting async operation...");
        await delay(2000);
        print("Async operation completed.");
    };

    await asyncOperation();

    print(`Proxy object: ${Object.prototype.toString.call(proxyObject)}`);  
}

complexFeatureDemo();
