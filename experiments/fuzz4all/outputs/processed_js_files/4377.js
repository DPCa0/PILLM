 
const complexFeatureDemo = async () => {
     
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
     
    const targetObj = {
        [Symbol('id')]: 101,
        name: 'ComplexObject',
        count: 0
    };
  
    const handler = {
        get: (target, prop, receiver) => {
            print(`GET property: ${String(prop)}`);
            return Reflect.get(target, prop, receiver);
        },
        set: (target, prop, value, receiver) => {
            print(`SET property: ${String(prop)} to ${value}`);
            return Reflect.set(target, prop, value, receiver);
        }
    };
  
    const proxiedObject = new Proxy(targetObj, handler);

     
    proxiedObject.name = 'AdvancedObject';
    print(`Object name is now: ${proxiedObject.name}`);
    
     
    print('Waiting 2 seconds...');
    await delay(2000);

    proxiedObject.count += 1;
    print(`Object count is now: ${proxiedObject.count}`);
};

complexFeatureDemo();
