 

 
const _state = Symbol('state');

 
const createStatefulObject = () => {
    const handler = {
        get(target, property, receiver) {
            if (property === _state) {
                return 'Access Denied';
            }
            return Reflect.get(target, property, receiver);
        }
    };
    
    const target = {
        [_state]: 'Initial State',
        getState() {
            return this[_state];
        }
    };
    
    return new Proxy(target, handler);
};

 
async function* asyncDataStream() {
    let count = 1;
    while (count <= 5) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield `Data Packet ${count++}`;
    }
}

const object = createStatefulObject();
print(object.getState());  
print(object[_state]);     

(async () => {
    for await (const data of asyncDataStream()) {
        print(data);
    }
})();

 
const dynamicObject = { name: 'Sample' };
Reflect.set(dynamicObject, 'name', 'Updated Sample');
Reflect.defineProperty(dynamicObject, 'description', {
    value: 'This is a dynamic object',
    writable: true
});
print(dynamicObject);
