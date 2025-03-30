(async () => {
     
    const handler = {
        get(target, prop, receiver) {
            if (prop in target) {
                print(`Accessing property '${prop}'`);
                return Reflect.get(target, prop, receiver);
            } else {
                throw new ReferenceError(`Property '${prop}' does not exist`);
            }
        },
        set(target, prop, value) {
            print(`Setting property '${prop}' to '${value}'`);
            return Reflect.set(target, prop, value);
        }
    };
    
    const targetObject = {
        name: 'Complex Object',
        type: 'Proxy'
    };
    
    const proxiedObject = new Proxy(targetObject, handler);
    
     
    const { name, ...otherProperties } = proxiedObject;

    print(name);
    print(otherProperties);
    
     
    const asyncOperation = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Asynchronous operation completed');
        }, 1000);
    });
    
    try {
        const result = await asyncOperation();
        print(result);
    } catch (error) {
        console.error(error);
    }
    
     
    function* numberGenerator() {
        let number = 1;
        while (true) {
            yield number++;
        }
    }
    
    const generator = numberGenerator();
    
    for (let i = 0; i < 3; i++) {
        print(generator.next().value);
    }
    
     
    const uniqueKey = Symbol('unique');
    proxiedObject[uniqueKey] = 'This is a unique key';
    print(proxiedObject[uniqueKey]);
    
     
    const additionalProperties = { status: 'active' };
    const mergedObject = { ...proxiedObject, ...additionalProperties };
    
    print(mergedObject);
})();
